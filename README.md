# MedConsu - Interface Médico/Paciente

O **MedConsu** é uma aplicação mobile desenvolvida para facilitar a busca por profissionais de saúde, agendamento de consultas e acompanhamento de históricos médicos e receitas digitais de forma prática e centralizada.

---

## Funcionalidades Implementadas no Protótipo

Atualmente, o protótipo da aplicação contempla os seguintes fluxos e telas:

### 1. Autenticação e Gestão de Acesso

- **Tela de Login:** Acesso rápido ao sistema com campos de validação visual.
- **Tela de Cadastro:** Formulário para criação de conta de novos pacientes.

### 2. Tela Principal (Home)

- **Saudação Personalizada:** Exibição do perfil do paciente conectado.
- **Busca Dinâmica de Médicos:** Filtro em tempo real por **nome**, **especialidade** ou **instituição de saúde**.
- **Acesso Rápido a Documentos:** Atalho em destaque no topo da tela para acesso direto às receitas e laudos.

### 3. Perfil Dinâmico do Médico

- **Exibição Personalizada de Dados:** Ao selecionar qualquer médico na lista, a tela exibe dinamicamente o **CRM**, **Especialidade**, **Instituição/Local de atendimento** e **Descrição profissional**.
- **Solicitação de Consulta:** Ação para solicitar agendamento enviando os requisitos ao médico.

### 4. Documentos, Receitas e Prontuário

- **Filtros por Categoria:** Alternância simples entre abas para visualizar **Todas**, **Receitas**, **Laudos** ou **Recomendações**.
- **Agrupamento por Médico Emissor:** Documentos organizados em blocos contendo os dados do profissional de saúde responsável (Nome, Especialidade e CRM).
- **Download / Visualização:** Acesso aos detalhes de prescrições e orientações médicas.

### 5. Configuração de Perfil

- **Editar Perfil:** Tela destinada à edição de dados pessoais do paciente.

---

## Link do protótipo Figma

[Protótipo Figma](https://www.figma.com/design/i9u1BvSRLE9xg2p4GmvuHD/Sem-t%C3%ADtulo?node-id=1-4569&t=Kna1rpO14EqjwqVB-1)

## Tecnologias Utilizadas
- **Backend:** [FastAPI]
- **Framework:** [React Native]
- **Linguagem:** [TypeScript]
- **Estilização:** [NativeWind v4]
- **Navegação:** [React Navigation]
- **Ferramentas de Depuração:** [Expo GO v.56]

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado na máquina
- Gerenciador de pacotes (`npm` ou `yarn`)
- Aplicativo **Expo Go** no celular ou um emulador Android/iOS configurado

### Passo a passo

**Clone o repositório:**
   ```bash
   git clone [https://github.com/PedroLuis19/Projeto-Programacao-Dispositivos-Moveis.git](https://github.com/PedroLuis19/Projeto-Programacao-Dispositivos-Moveis.git)
   cd Projeto-Programacao-Dispositivos-Moveis/MedConsu
   ```

O projeto está dividido em duas partes principais: o **Backend** e o **Frontend**. Ambos devem correr simultaneamente em terminais separados.

---

### 1. Configuração e Execução do Backend (FastAPI)

1. Aceda à pasta do backend:
   ```bash
   cd backend
   ```

2. Crie e ative um ambiente virtual (`venv`):
   * **No Windows (PowerShell):**
     ```bash
     python -m venv venv
     .\venv\Scripts\Activate
     ```
   * **No macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Instale as dependências necessárias (FastAPI, SQLModel, Uvicorn e o driver PostgreSQL `psycopg`):
   ```bash
   pip install fastapi sqlmodel "psycopg[binary]" uvicorn
   ```
   *(Nota: Se houver um arquivo `requirements.txt`, pode executar `pip install -r requirements.txt`)*.

4. Configure a string de conexão com a base de dados **Neon PostgreSQL** nas variáveis de ambiente ou diretamente no código de configuração do banco.

5. Inicie o servidor backend:
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   O servidor ficará disponível em `http://localhost:8000`. Pode consultar a documentação interativa em `http://localhost:8000/docs`.

---

### 2. Configuração e Execução do Frontend (React Native / Expo)

1. Abra um **novo terminal** na pasta raiz do projeto (onde está o frontend).

2. Instale as dependências do Node:
   ```bash
   npm install
   ```

3. Certifique-se de que o cliente HTTP (`axios`) está instalado para comunicar com a API:
   ```bash
   npm install axios
   ```

4. Verifique a configuração da URL base da API (geralmente em `src/services/api.ts`):
   * Para o **Emulador Android**: utilize `http://10.0.2.2:8000`
   * Para um **dispositivo físico** (na mesma rede Wi-Fi): utilize o endereço IP local da sua máquina (ex: `http://192.168.X.X:8000`).

5. Inicie a aplicação com o Expo (limpando o cache para evitar conflitos):
   ```bash
   npx expo start -c
   ```

---

## Caso de Uso e Planejamento de Requisitos estão na pasta [docs]
