#Aqui que será feito a import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, Session, create_engine, select
from dotenv import load_dotenv

# Carrega a variável DATABASE_URL do arquivo .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Se o Neon retornar postgres:// no início, ajusta para postgresql:// para o SQLAlchemy
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Conexão com o banco de dados Neon
engine = create_engine(DATABASE_URL, echo=True)

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

# -------------------------------------------------------------------
# CONFIGURAÇÃO DA APLICAÇÃO FASTAPI
# -------------------------------------------------------------------

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

# Injeção de dependência para abrir e fechar sessões do banco por requisição
def get_session():
    with Session(engine) as session:
        yield session

# -------------------------------------------------------------------
# ROTAS DA API
# -------------------------------------------------------------------

@app.get("/")
def root():
    return {"status": "API conectada ao Neon PostgreSQL!"}

# Cadastrar um novo médico no banco Neon
@app.post("/medicos", response_model=Medico, status_code=status.HTTP_201_CREATED)
def criar_medico(medico: Medico, session: Session = Depends(get_session)):
    # Verifica se o CRM já foi cadastrado
    crm_existente = session.exec(select(Medico).where(Medico.crm == medico.crm)).first()
    if crm_existente:
        raise HTTPException(
            status_code=400, 
            detail="Já existe um médico cadastrado com este CRM."
        )
    
    session.add(medico)
    session.commit()
    session.refresh(medico)
    return medico

# Listar e buscar médicos cadastrados no banco Neon
@app.get("/medicos", response_model=List[Medico])
def listar_medicos(busca: Optional[str] = None, session: Session = Depends(get_session)):
    query = select(Medico)
    
    if busca:
        termo = f"%{busca.lower()}%"
        # Busca case-insensitive no PostgreSQL
        query = query.where(
            (Medico.nome.ilike(termo)) | 
            (Medico.especialidade.ilike(termo)) | 
            (Medico.instituicao.ilike(termo))
        )
        
    medicos = session.exec(query).all()
    return medicosprogramação backend