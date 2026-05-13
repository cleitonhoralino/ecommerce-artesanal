const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Token não fornecido'
      });
    }

    // Bearer TOKEN
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Token inválido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido ou expirado'
    });
  }
};