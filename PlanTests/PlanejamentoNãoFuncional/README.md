## 📝 Planejamento de Testes Não Funcionais

### Nome do Projeto:

- **API Cinema - Rotas Movies e Tickets**

### ✏️ Resumo:
Este plano de teste visa avaliar o desempenho, segurança e resiliência da API Cinema, focando em testes não funcionais, como **load, stress, soak, spike e smoke**. O objetivo é garantir que o sistema suporte diferentes condições de uso sem comprometer a experiência do usuário ou a integridade dos dados.

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

- A API deve ser capaz de processar pelo menos 100 solicitações de criação de filmes por segundo.

- O tempo médio de resposta para a criação de um novo filme não deve exceder 200 milissegundos.

- A API deve ser capaz de responder a solicitações GET de listagem de filmes em menos de 100 milissegundos.

- A lista de filmes deve ser paginada, com no máximo 20 filmes por página.

- A API deve ser capaz de responder a solicitações GET de detalhes de um filme em menos de 50 milissegundos.

- A API deve ser capaz de processar pelo menos 50 solicitações de atualização de filmes por segundo.

- O tempo médio de resposta para a atualização dos detalhes de um filme não deve exceder 300 milissegundos.

- A API deve ser capaz de processar pelo menos 30 solicitações de exclusão de filmes por segundo.

- O tempo médio de resposta para a exclusão de um filme não deve exceder 400 milissegundos.


### 🎟️ Tickets

- A API deve ser capaz de processar pelo menos 50 solicitações de reserva de ingressos por segundo.

- O tempo médio de resposta para a reserva de um ingresso não deve exceder 300 milissegundos.

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

- **Smoke Test:** Verificar se os principais endpoints funcionam corretamente.

- **Load Test:** Avaliar o desempenho da API com a carga esperada de usuários.

- **Stress Test:** Testar o limite da API com carga crescente até identificar falhas.

- **Spike Test:** Simular picos repentinos de acesso para verificar a resposta.

- **Soak Test:** Avaliar a estabilidade da API ao longo do tempo, verificando vazamentos e degradação de desempenho.