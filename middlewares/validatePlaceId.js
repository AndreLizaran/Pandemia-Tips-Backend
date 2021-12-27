const { response } = require('express');

async function validatePlaceId (req, res = response, next) {
  try {
    const { idPlace } = res.params;
    next();
  } catch {
    res.status(500).json({
      ok:false,
      error:'E0'
    })
  }
}

module.exports = validatePlaceId;