const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const authMiddleware =
  require('../middleware/authMiddleware');

const adminMiddleware =
  require('../middleware/adminMiddleware');

const router = express.Router();


// CADASTRO
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, cpf, address } = req.body;

    // Verifica se usuário já existe
    const existingUser = await User.findOne({
      $or: [{ email }, { cpf }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Usuário já cadastrado'
      });
    }

    // Criptografa senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria usuário
    const user = new User({
      name,
      email,
      password: hashedPassword,
      cpf,
      address,
    });

    await user.save();

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Erro no servidor',
      error: error.message
    });
  }
});
      // REGISTER
router.post('/register', async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      cpf,
      address
    } = req.body;

    // VERIFICA EMAIL
    const emailExists = await User.findOne({
      email
    });

    if (emailExists) {

      return res.status(400).json({
        message: 'Email já cadastrado'
      });
    }

    // VERIFICA CPF
    const cpfExists = await User.findOne({
      cpf
    });

    if (cpfExists) {

      return res.status(400).json({
        message: 'CPF já cadastrado'
      });
    }

    // HASH SENHA
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CRIAR USUÁRIO
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      address,
    });

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: 'Erro ao cadastrar usuário',
      error: error.message,
    });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca usuário
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Email ou senha inválidos'
      });
    }

    // Verifica senha
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Email ou senha inválidos'
      });
    }

    // Gera token JWT
     const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
       },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });

  } catch (error) {
    res.status(500).json({
      message: 'Erro no servidor',
      error: error.message
    });
  }
});
    // LISTAR USUÁRIOS (ADMIN)
    router.get(
      '/users',
      authMiddleware,
      adminMiddleware,

    async (req, res) => {

    try {

      const users = await User.find()
        .select('-password');

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: 'Erro ao buscar usuários'
      });

    }
  }
);
      // ALTERAR ROLE
router.put(
  '/users/:id/role',
  authMiddleware,
  adminMiddleware,

  async (req, res) => {

    try {

      const { role } = req.body;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select('-password');

      res.json({
        message: 'Cargo atualizado',
        user,
      });

    } catch (error) {

      res.status(500).json({
        message: 'Erro ao atualizar cargo'
      });

    }
  }
);
module.exports = router;