// Modules
const { response } = require('express');

// Helpers
const validateUserToken = require('../helpers/validateToken');

// Models
const User = require('../models/User');

async function validateToken (req, res = response, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ error:'Token no entregado' });
    const _id = validateUserToken(authorization.split(' ')[1]); 
    if (!_id) return res.status(400).json({ error:'Token incorrecto' });
    const savedUser = await User.findById(_id);
    if (!savedUser) return res.status({ error:'Usuario no existente' });
    req.body.userInformation = savedUser;
    next();
  } catch {
    res.status(500).json({ error:'Error del servidor' });
  }
}

module.exports = validateToken;