# 🚗 ConnectaSys API

**ConnectaSys** é uma API RESTful modular construída com Node.js, TypeScript e PostgreSQL, projetada para um sistema **SaaS de gestão para oficinas mecânicas**.

![banner](./A_digital_graphic_design_banner_for_ConnectaSys_AP.png)

---

## 📦 Tecnologias

- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL**
- **DDD Modular Architecture**
- **Swagger UI** (documentação interativa)
- **SCRIPTS CLI** para automação

---

## 🔧 Estrutura de Pastas

```bash
src/
└── modules/
    ├── users/
    ├── projects/
    └── tasks/
```

---

## 🚀 Como rodar localmente

```bash
# Instale as dependências
npm install

# Compile TypeScript (gera dist/)
npx tsc

# Rode em modo desenvolvimento
npm run dev

# Swagger UI disponível em:
http://localhost:3000/swagger
```

---

## 🌐 Endpoints principais

| Método | Rota               | Descrição              |
|--------|--------------------|-------------------------|
| GET    | `/api/v1/Users`    | Lista usuários          |
| POST   | `/api/v1/Users`    | Cria usuário            |
| GET    | `/api/v1/Projects` | Lista projetos (exemplo)|
| POST   | `/api/v1/Tasks`    | Cria tarefa (exemplo)   |

---

## 🔐 Segurança

- Autenticação será baseada em JWT (em desenvolvimento).
- Criptografia de senha com `bcrypt` planejada para release futura.

---

## 📄 Licença

MIT © 2025 - Contribuidores do ConnectaSys

---

## 💬 Contato

Para dúvidas, sugestões ou contribuições:
**Paulo Cergio** – juniorcergio@gmail.com

---
