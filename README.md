# Extrator de Requerentes - Escavador

Este projeto automatiza o processo de extração dos **nomes dos requerentes (Polo Ativo)** de processos judiciais listados no site [Escavador](https://www.escavador.com), com base no número do precatório.

Os dados extraídos são salvos automaticamente em um banco de dados MySQL.

---

## Funcionalidades

- Login automatizado no site Escavador
- Busca por número de precatório
- Acesso à página do processo
- Extração de nomes dos requerentes (Polo Ativo)
- Registro dos nomes no banco de dados via `requerenteRepository`

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org)
- [Selenium WebDriver](https://www.selenium.dev/)
- [MySQL](https://www.mysql.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---
