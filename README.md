# Compass Challenge Quality Assurance

### 🙋 Apresentação Pessoal:

Meu nome é **Thaise Chaves Zanin**, sou de Marau - RS, tenho 18 anos, estou cursando Ciência da Computação na Atitus e atualmente estou no 3° semestre da graduação.

### Informações Pessoais:

**Cor dos Olhos:** Castanho Escuro

**Cor de Cabelo:** Castanho Escuro

**Cor de Pele:** Branca

---
### 📍 Introdução

Este repositório faz parte da Challenge da Sprint 8 do **Programa de Bolsas Quality Assurance da Compass UOL**. O objetivo é garantir a qualidade da API Cinema, que gerencia filmes e tickets, validando suas funcionalidades por meio de testes funcionais e não funcionais.

---
### 📌 Sobre a API

A [API Cinema](http://localhost:3000/api/docs) possui endpoints para operações CRUD relacionadas a filmes e tickets, permitindo:

- ✅ Listar, criar, atualizar e deletar filmes.

- ✅ Gerenciar tickets, incluindo criação, consulta e exclusão.

### Os principais endpoints são:

### 🎥 Movies

**GET /movies** – Lista todos os filmes.

**POST /movies** – Cria um novo filme.

**GET /movies/{id}** – Busca um filme específico.

**PUT /movies/{id}** – Atualiza um filme.

**DELETE /movies/{id}** – Remove um filme.

---
### 🎟️ Tickets

**POST /tickets** – Cria um novo ticket.

**GET /tickets** – Lista todos os tickets.

**GET /tickets/{id}** – Busca um ticket pelo ID.

**PUT /tickets/{id}** – Atualiza um ticket.

**DELETE /tickets/{id}** – Remove um ticket.

---

### Planejamento de Testes Funcionais

Este planejamento detalha a abordagem para a validação da API Cinema, garantindo que seus endpoints funcionem corretamente e atendam aos requisitos definidos.


#### 🛠️ Configuração e Execução da API

Antes de iniciar os testes, é necessário configurar e executar a API. A seguir, explico como rodá-la de duas maneiras:

#### 1️⃣ Instalando e Rodando a API Localmente

1. Baixar o repositório para sua máquina.

2. Abrir o terminal e navegar até a pasta do projeto.

3. Instalar as dependências executando:
`
npm install
`

4. Iniciar a aplicação com o comando:
`
npm run start
`

5. Após a execução, a API estará disponível em:

- Swagger (Documentação da API): **http://localhost:3000/api/docs**

---
#### 2️⃣ Rodando a API via Docker

Caso prefira rodar a API utilizando Docker, siga os passos abaixo:

1. **Certifique-se de que o Docker está instalado** em sua máquina.

2. No terminal, navegue até a pasta do projeto e execute:
`
docker build -t api-cinema .
`
3. Após a construção da imagem, rode o container:

`
docker run -p 3000:3000 api-cinema
`

4. A API estará disponível no mesmo endereço: **http://localhost:3000/api/docs** 

---
### ✅ Requisitos

Para a execução dos testes funcionais, será necessário o uso do **Postman**.

#### 📌 Requisitos necessários:

- Ter a **API Cinema** rodando localmente.

- Instalar o **Postman**, ferramenta que será utilizada para realizar os testes.

---
#### Rotas a serem testadas:

- /movies

- /tickets

#### Cenários a serem testados:

### 🎥 Movies

- Criar um novo filme.

- Listar todos os filmes.

- Buscar um filme específico.

- Atualizar um filme.

- Remover um filme.

---
### 🎟️ Tickets

- Criar um novo ticket.

- Listar todos os tickets.

- Buscar um ticket pelo ID.

- Atualizar um ticket.

- Remover um ticket.

---
### Estratégias de Teste

- **Testes Funcionais**

   - **Testes Positivos:** Verificam se a API retorna as respostas esperadas para entradas válidas.

   - **Testes Negativos:** Simulam entradas inválidas para validar o tratamento de erros.