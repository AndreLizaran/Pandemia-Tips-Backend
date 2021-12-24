// Modules
const { response } = require('express');

// Models
const User = require('../models/User');

async function validateEmail (req, res = response, next) {
  const { email } = req.body;
  const savedUser = await User.findOne({ email });
  req.body.userInformation = savedUser;
  next();
}

module.exports = validateEmail;