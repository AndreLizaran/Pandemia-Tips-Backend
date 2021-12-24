// Modules
const { response } = require('express');
const { validationResult } = require('express-validator');

function validateInformation (req, res = response, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

module.exports = validateInformation;