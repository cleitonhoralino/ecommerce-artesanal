const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/Auth');
const productRoutes = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());


// ROTAS
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


// CONEXÃO MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((err) => console.log(err));


// ROTA TESTE
app.get('/', (req, res) => {
  res.send('API funcionando!');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});