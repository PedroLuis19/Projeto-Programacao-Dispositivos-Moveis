import os
import requests
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, Session, create_engine, select
from dotenv import load_dotenv

# Carrega a variável DATABASE_URL do arquivo .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Conexão com o banco PostgreSQL no Neon
engine = create_engine(DATABASE_URL, echo=True)

# Função de dependência para obter a sessão do banco de dados
def get_session():
    with Session(engine) as session:
        yield session

# -------------------------------------------------------------------
# MODELOS DO BANCO DE DADOS (TABELAS)
# -------------------------------------------------------------------

class Medico(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    especialidade: str
    crm: str = Field(unique=True, index=True)
    instituicao: str
    email: Optional[str] = None
    sobre: Optional[str] = None

class Paciente(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    email: str = Field(unique=True, index=True)
    senha: str
    expo_push_token: Optional[str] = None  # Token para notificações push no Android

class Documento(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    id_paciente: int = Field(foreign_key="paciente.id", index=True)
    id_medico: int = Field(foreign_key="medico.id", index=True)
    tipo: str  # Ex: "Receita", "Laudo", "Recomendacao"
    conteudo_txt: str

# -------------------------------------------------------------------
# CONFIGURAÇÃO DO FASTAPI
# -------------------------------------------------------------------

app = FastAPI(title="MedConsu API + Neon PostgreSQL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    try:
        print("Tentando criar tabelas no Neon...")
        SQLModel.metadata.create_all(engine)
        print("Tabelas criadas ou verificadas com sucesso no Neon!")
    except Exception as e:
        print(f"ERRO ao conectar ou criar tabelas no banco: {e}")
# -------------------------------------------------------------------
# FUNÇÃO AUXILIAR DE NOTIFICAÇÃO PUSH
# -------------------------------------------------------------------

def enviar_notificacao_boas_vindas(expo_push_token: str, nome_usuario: str):
    if not expo_push_token:
        return
    
    url = "https://exp.host/--/api/v2/push/send"
    payload = {
        "to": expo_push_token,
        "sound": "default",
        "title": "Bem-vindo(a) ao MedConsu! 🎉",
        "body": f"Olá {nome_usuario}, seu cadastro foi realizado com sucesso.",
        "data": {"rota": "Home"}
    }
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-encoding": "gzip, deflate",
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
    except Exception as e:
        print(f"Erro ao enviar push notification: {e}")

# -------------------------------------------------------------------
# ROTAS DA API
# -------------------------------------------------------------------

@app.get("/")
def root():
    return {"status": "API conectada ao Neon PostgreSQL!"}

# --- MÉDICOS ---
@app.post("/medicos", response_model=Medico, status_code=status.HTTP_201_CREATED)
def criar_medico(medico: Medico, session: Session = Depends(get_session)):
    crm_existente = session.exec(select(Medico).where(Medico.crm == medico.crm)).first()
    if crm_existente:
        raise HTTPException(status_code=400, detail="CRM já cadastrado.")
    session.add(medico)
    session.commit()
    session.refresh(medico)
    return medico

@app.get("/medicos", response_model=List[Medico])
def listar_medicos(busca: Optional[str] = None, session: Session = Depends(get_session)):
    query = select(Medico)
    if busca:
        termo = f"%{busca.lower()}%"
        query = query.where(
            (Medico.nome.ilike(termo)) | 
            (Medico.especialidade.ilike(termo)) | 
            (Medico.instituicao.ilike(termo))
        )
    return session.exec(query).all()

# --- PACIENTES ---
@app.post("/pacientes", response_model=Paciente, status_code=status.HTTP_201_CREATED)
def criar_paciente(paciente: Paciente, session: Session = Depends(get_session)):
    email_existente = session.exec(select(Paciente).where(Paciente.email == paciente.email)).first()
    if email_existente:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado.")
    
    session.add(paciente)
    session.commit()
    session.refresh(paciente)
    
    if paciente.expo_push_token:
        enviar_notificacao_boas_vindas(paciente.expo_push_token, paciente.nome)
        
    return paciente

# --- DOCUMENTOS ---
@app.post("/documentos", response_model=Documento, status_code=status.HTTP_201_CREATED)
def criar_documento(documento: Documento, session: Session = Depends(get_session)):
    if not session.get(Medico, documento.id_medico) or not session.get(Paciente, documento.id_paciente):
        raise HTTPException(status_code=404, detail="Médico ou Paciente não encontrado.")
    session.add(documento)
    session.commit()
    session.refresh(documento)
    return documento

@app.get("/documentos", response_model=List[Documento])
def listar_documentos(id_paciente: Optional[int] = None, id_medico: Optional[int] = None, session: Session = Depends(get_session)):
    query = select(Documento)
    if id_paciente:
        query = query.where(Documento.id_paciente == id_paciente)
    if id_medico:
        query = query.where(Documento.id_medico == id_medico)
    return session.exec(query).all()