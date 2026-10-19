import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, Session, create_engine, select
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Se o Neon retornar postgres:// no início, ajusta para postgresql:// para o SQLAlchemy
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Conexão com o banco de dados Neon
engine = create_engine(DATABASE_URL, echo=True)

# Modelos do banco de daods

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

class Documento(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    id_paciente: int = Field(foreign_key="paciente.id", index=True)
    id_medico: int = Field(foreign_key="medico.id", index=True)
    tipo: str 
    conteudo_txt: str

app = FastAPI(title="MedConsu API + Neon PostgreSQL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no Neon assim que o servidor inicia
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# Injeção de dependência para sessões do banco
def get_session():
    with Session(engine) as session:
        yield session

# Rotas API

@app.get("/")
def root():
    return {"status": "API conectada ao Neon PostgreSQL com suporte a Documentos!"}

# MÉDICOS

@app.post("/medicos", response_model=Medico, status_code=status.HTTP_201_CREATED)
def criar_medico(medico: Medico, session: Session = Depends(get_session)):
    crm_existente = session.exec(select(Medico).where(Medico.crm == medico.crm)).first()
    if crm_existente:
        raise HTTPException(status_code=400, detail="Já existe um médico cadastrado com este CRM.")
    
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

# PACIENTES

@app.post("/pacientes", response_model=Paciente, status_code=status.HTTP_201_CREATED)
def criar_paciente(paciente: Paciente, session: Session = Depends(get_session)):
    email_existente = session.exec(select(Paciente).where(Paciente.email == paciente.email)).first()
    if email_existente:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado.")
    
    session.add(paciente)
    session.commit()
    session.refresh(paciente)
    return paciente

# DOCUMENTOS

@app.post("/documentos", response_model=Documento, status_code=status.HTTP_201_CREATED)
def criar_documento(documento: Documento, session: Session = Depends(get_session)):
    # Opcional: Validar se o médico e o paciente existem antes de salvar
    medico = session.get(Medico, documento.id_medico)
    paciente = session.get(Paciente, documento.id_paciente)
    
    if not medico:
        raise HTTPException(status_code=404, detail="Médico não encontrado.")
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente não encontrado.")
        
    session.add(documento)
    session.commit()
    session.refresh(documento)
    return documento

@app.get("/documentos", response_model=List[Documento])
def listar_documentos(
    id_paciente: Optional[int] = None, 
    id_medico: Optional[int] = None, 
    session: Session = Depends(get_session)
):
    query = select(Documento)
    
    # Filtra por paciente se o ID for passado na URL (ex: /documentos?id_paciente=1)
    if id_paciente:
        query = query.where(Documento.id_paciente == id_paciente)
        
    # Filtra por médico se o ID for passado na URL
    if id_medico:
        query = query.where(Documento.id_medico == id_medico)
        
    return session.exec(query).all()