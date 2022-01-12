// Modules
const { response } = require('express');

// Models
const User = require('../models/User');

async function validateEmail (req, res = response, next) {
  try {
    const { email } = req.body;
    const savedUser = await User.findOne({ email });
    req.body.userInformation = savedUser;
    next();
  } catch {
    res.status(500).json({ ok:false, error:'Error del servidor' });
  }
}

module.exports = validateEmail;