## 📝 Planejamento de Testes Funcionais

### Nome do Projeto:

- **API Cinema - Rotas Movies e Tickets**

### ✏️ Resumo:
Este plano de teste visa validar as rotas de movies e tickets da API Cinema, cobrindo operações de CRUD. O foco é garantir o funcionamento correto das funcionalidades, incluindo **criar, listar, atualizar e excluir** registros, além de assegurar a validação dos dados, autenticação e segurança, garantindo que os requisitos de negócio sejam atendidos e prevenindo acessos indevidos.

---
### 🙍 Pessoas Envolvidas:

Thaise Chaves Zanin - **QA**

---
### ⚙️ Funcionalidades ou Módulos a serem testados:

### /movies

- Criar um novo filme.

- Listar todos os filmes.

- Buscar um filme específico.

- Atualizar um filme.

- Remover um filme.


### /tickets

- Criar um novo ticket.

- Listar todos os tickets.

- Buscar um ticket pelo ID.

- Atualizar um ticket.

- Remover um ticket.

---

### 📍 Local de Testes:

- Ambiente de Teste: **[API Cinema](http://localhost:3000/api/docs)**

---
### 🔨 Recursos Necessários:

- **Ferramentas:** GitHub, Visual Studio Code, K6, Jira, Miro, Postman, AWS EC2, Docker;

- **Ambiente configurado com acesso à API.**

---
### 📎 Critérios Usados:


### 🎥 Movies

- **Criar Filme:** Usuário administrador envia POST para /movies com detalhes. O sistema valida os dados, cria o filme com ID único e retorna 201 Created.

- **Listar Filmes:** Usuário envia GET para /movies. O sistema retorna a lista de filmes cadastrados.

- **Listar Filme por ID:** Usuário envia GET para /movies/{id}. Se existir, retorna detalhes; se não, retorna 404 Not Found.

- **Atualizar Filme:** Usuário administrador envia PUT para /movies/{id}. Se válido, atualiza os detalhes e retorna 200 OK.

- **Excluir Filme:** Usuário administrador envia DELETE para /movies/{id}. Se existir, remove e retorna 204 No Content.



### 🎟️ Tickets

- O usuário envia uma solicitação POST para o endpoint /tickets com os seguintes detalhes do ingresso: **ID do Filme (movieId)**, **ID do Usuário (userId)**, **Número do Assento (seatNumber)**, **Preço do Ingresso (price)** e **Data de Apresentação (showtime)**.

- O sistema valida se todos os campos obrigatórios estão preenchidos corretamente.

- O sistema verifica se o número do assento está dentro do intervalo de 0 a 99.

- O sistema verifica se o preço do ingresso está dentro do intervalo de 0 a 60.

- Se todas as validações passarem, o sistema cria uma reserva de ingresso com os detalhes fornecidos.

- O sistema atribui um ID único à reserva de ingresso.

- O sistema retorna uma resposta de sucesso com o status 201 Created, incluindo o ID da reserva de ingresso 

---
### 📛 Riscos:

- Erros na API: Possibilidade de falhas que causem indisponibilidade ou comportamento inesperado.

- Documentação: Desatualização ou informações insuficientes que prejudiquem o desenvolvimento e manutenção.

---
### ⏱️ Cronograma:
O cronograma seguido foi da Sprint 08 do dia 24/02 ao dia 12/03.

---
### ✔️ Como os Resultados dos Testes Serão Divulgados:


Relatórios detalhados no GitHub;

Screenshots dos resultados;

Apresentação final.

---

### 📝 Estratégias de Teste

**Testes Positivos:** Verificam se a API retorna as respostas esperadas para entradas válidas.

**Testes Negativos:** Simulam entradas inválidas para validar o tratamento de erros.