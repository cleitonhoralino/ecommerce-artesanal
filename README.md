# E-commerce de Produtos Artesanais

Projeto desenvolvido como MVP de um sistema de e-commerce para venda de produtos artesanais, utilizando React no frontend, Node.js no backend e MongoDB como banco de dados.

---

# Objetivo

Desenvolver uma aplicação completa de e-commerce contendo:

- Cadastro e login de usuários
- Autenticação JWT
- Catálogo de produtos
- Carrinho de compras
- Checkout simulado
- Painel administrativo
- CRUD de produtos
- Controle de acesso por perfil
- Integração frontend + backend + banco de dados
- Deploy online

---

# Tecnologias Utilizadas

## Frontend
- React
- TypeScript
- Vite
- TailwindCSS

## Backend
- Node.js
- Express

## Banco de Dados
- MongoDB Atlas
- Mongoose

## Autenticação
- JWT (JSON Web Token)
- bcryptjs

## Deploy
- Vercel (Frontend)
- Render (Backend)

---

# Funcionalidades

## Usuários
- Cadastro de usuários
- Login autenticado
- Logout
- Controle de perfil (user/admin)

## Produtos
- Listagem de produtos
- Exibição de imagem, preço e descrição
- Filtro por categoria

## Carrinho
- Adicionar produtos
- Remover produtos
- Cálculo total
- Simulação de frete

## Checkout
- Simulação de pagamento
- Geração de pedido fake

## Painel Administrativo
- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Visualização de usuários
- Alteração de cargo dos usuários

---

# Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Rotas protegidas
- Controle de acesso admin

---

# Deploy Online

## Frontend
(https://ecommerce-artesanal-m68cdwe75-cleiton-horalino-s-projects.vercel.app/)

## Backend
https://ecommerce-artesanal-cgo6.onrender.com

---

# Vídeo Demonstrativo

https://drive.google.com/file/d/1XNfNE6P_Wo7-9QC5TnXPZgxedyn3XV7N/view?usp=sharing

---

# Como Executar Localmente

## Clonar o projeto

```bash
git clone https://github.com/cleitonhoralino/ecommerce-artesanal.git

--------------------------
## Entrar no Backend
cd backend
----

## Instalar dependências
npm install

## Criar arquivo .env
MONGO_URI=SUA_STRING_MONGODB
JWT_SECRET=sua_chave_jwt
PORT=5000

## Rodar backend
npm run dev

## Entrar na pasta client
cd client

## Instalar dependências
pnpm install

## Rodar frontend
pnpm run dev

## Estrutura do Projeto
backend/
client/
server/
shared/

Autor
Cleiton Horalino


