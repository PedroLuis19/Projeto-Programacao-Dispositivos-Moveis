# MedConsu 

**MedConsu** é uma plataforma de gestão de consultas e documentos médicos composta por uma aplicação mobile moderna desenvolvida em **React Native (Expo)** e uma API de alto desempenho construída em **FastAPI (Python)**, integrada a um banco de dados **PostgreSQL (Neon)** em nuvem.

##  Arquitetura do Sistema

* **Frontend**: React Native (Expo SDK 53+), React Navigation, Tailwind CSS (NativeWind), Axios.
* **Backend**: Python 3.10+, FastAPI, SQLModel (ORM assíncrono/síncrono sob SQLAlchemy), Uvicorn.
* **Banco de Dados**: PostgreSQL hospedado no [Neon Tech](https://neon.tech/), conectado via driver `psycopg` (v3).

## 🛠️ Pré-requisitos do Sistema

Antes de clonar o projeto, certifique-se de que a sua máquina possui os seguintes softwares instalados:

1. **Node.js**: Versão LTS (`v18.x` ou `v20.x`).
2. **Python**: Versão `3.10` ou superior.
3. **Gerenciador de Pacotes**: `npm` (incluso no Node) ou `yarn`.
4. **Ambiente de Execução Mobile**:
   * **Emulador Android**: Android Studio configurado com um dispositivo virtual (AVD) rodando Android 10+ e **JDK 17**.
   * **Dispositivo Físico**: Aplicativo **Expo Go** instalado via Google Play Store ou App Store.

## 🚀 Guia de Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd MedConsu
```

### 2. Configuração do Backend (FastAPI + Neon PostgreSQL)

O backend gerencia as rotas REST da aplicação e a persistência dos dados no banco em nuvem.

1. **Acessar a pasta do backend:**
   ```bash
   cd backend
   ```

2. **Criar e ativar o ambiente virtual (`venv`):**
   * **Windows (PowerShell):**
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate
     ```
   * **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Instalar as dependências:**
   ```bash
   pip install fastapi sqlmodel "psycopg[binary]" uvicorn
   ```

4. **Configurar a Conexão com o Banco de Dados (Neon):**
   No seu arquivo de conexão (ex: `database.py` ou `main.py`), verifique se a URL de conexão do PostgreSQL está configurada corretamente com as suas credenciais do Neon:
   ```python
   DATABASE_URL = "postgresql://<USUARIO>:<SENHA>@<HOST_NEON>/<NOME_BANCO>?sslmode=require"
   ```

5. **Iniciar o Servidor de Desenvolvimento:**
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   * **URL local da API**: `http://localhost:8000`
   * **Documentação Interativa (Swagger UI)**: `http://localhost:8000/docs`

### 3. Configuração do Frontend (React Native + Expo)

O frontend interage com a API REST para cadastro e autenticação de usuários, listagem de médicos e visualização de documentos.

1. **Acessar a raiz do projeto (em um novo terminal):**
   ```bash
   cd MedConsu
   ```

2. **Instalar as dependências do Node:**
   ```bash
   npm install
   ```

3. **Instalar o Axios (Cliente HTTP):**
   ```bash
   npm install axios
   ```

4. **Configurar o Endereço da API (`src/services/api.ts`):**
   Abra o arquivo `src/services/api.ts` e ajuste o `baseURL` conforme seu ambiente de teste:
   ```typescript
   import axios from 'axios';

   // Para Emulador Android no mesmo computador:
   export const API_URL = 'http://10.0.2.2:8000';

   // Para Dispositivo Físico (substitua pelo IP local da sua máquina na mesma rede Wi-Fi):
   // export const API_URL = 'http://192.168.1.X:8000';

   const api = axios.create({
     baseURL: API_URL,
   });

   export default api;
   ```

5. **Iniciar o Bundler do Expo:**
   ```bash
   npx expo start -c
   ```

6. **Executar a Aplicação**:
   * Pressione **`a`** no terminal para abrir automaticamente no **Emulador Android**.
   * Ou escaneie o **QR Code** exibido no terminal utilizando a câmera/Expo Go no seu celular físico.

##  Endpoints da API (FastAPI)

A documentação completa e interativa com os schemas de requisição/resposta pode ser visualizada acessando `http://localhost:8000/docs` quando o servidor estiver rodando.

###  Pacientes
| Método | Endpoint | Descrição |
| ------ | -------- | --------- |
| `POST` | `/pacientes/` | Cadastra um novo paciente no sistema |
| `GET` | `/pacientes/` | Lista todos os pacientes cadastrados |
| `GET` | `/pacientes/{id}` | Obtém os detalhes de um paciente específico |
| `PUT` | `/pacientes/{id}` | Atualiza o perfil/dados de um paciente |
| `DELETE` | `/pacientes/{id}` | Remove um paciente do sistema |

 Médicos
| Método | Endpoint | Descrição |
| ------ | -------- | --------- |
| `POST` | `/medicos/` | Cadastra um novo médico |
| `GET` | `/medicos/` | Lista todos os médicos e especialidades |
| `GET` | `/medicos/{id}` | Obtém o perfil detalhado de um médico |
| `PUT` | `/medicos/{id}` | Atualiza as informações do perfil do médico |

###  Documentos & Consultas
| Método | Endpoint | Descrição |
| ------ | -------- | --------- |
| `POST` | `/documentos/` | Envia um novo documento ou laudo médico |
| `GET` | `/documentos/paciente/{paciente_id}` | Lista todos os documentos atribuídos a um paciente |
| `GET` | `/documentos/{id}` | Obtém detalhes de um documento/laudo |

---

##  Solução de Problemas Comuns (Troubleshooting)

### 1. Conexão Recusada no Emulador Android (`Network Error`)
* Certifique-se de que a `baseURL` no `api.ts` está definida como `http://10.0.2.2:8000` e **não** `localhost`. O endereço `10.0.2.2` é um alias especial do emulador Android para acessar o `localhost` do seu computador.

### 2. Erro de Notificações no Expo Go (`expo-notifications`)
* O suporte a push notifications remotas foi descontinuado dentro do aplicativo Expo Go padrão no SDK 53+. Para manter o foco em desenvolvimento rápido no Expo Go, as chamadas de registro de notificações no `App.tsx` foram desativadas temporariamente.

### 3. Erros de Compilação Nativa (Gradle / Java Version)
* Se precisar rodar builds nativas (`npx expo run:android`), certifique-se de que a variável de ambiente `JAVA_HOME` está apontando para o **JDK 17** (disponível por padrão na pasta `jbr` da instalação do Android Studio), pois versões mais recentes como Java 21 ou 25 causam incompatibilidade com tarefas do CMake/Gradle.
