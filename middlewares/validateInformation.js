// Modules
const { response } = require('express');
const { validationResult } = require('express-validator');

function validateInformation (req, res = response, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  } catch {
    res.status(500).json({ ok:false, error:'E0' });
  }
}

module.exports = validateInformation;