# Respostas — Prova Prática Individual de DW2 — Versão C

Nome:
RA:

## R1 (Item 10)

Status da página  /  : 302

Status da API  /api/oficinas  : 401

Explicação: A página inicial redireciona a pessoa sem sessão para o login, por isso responde 302. A API informa em JSON que a autenticação é necessária e responde 401.

## R2 (Item 11)

Status observado: 405

Explicação: A rota `/api/oficinas` aceita `GET` para listar as oficinas. Como `PUT` não é aceito nesse endereço, o servidor responde 405 (método não permitido).
