// Modules
const { response } = require('express');

// Models
const Place = require('../models/Place')

async function validatePlaceId (req, res = response, next) {
  try {
    const { idPlace } = req.params;
    if (!idPlace) res.status(400).json({ ok:false, error:'E7' });
    const savedPlace = await Place.findById(idPlace);
    if (!savedPlace) return res.status(400).json({ ok:false, error:'E6' });
    req.body.placeInformation = savedPlace;
    next();
  } catch (error) {
    res.status(500).json({
      ok:false,
      error:'E0'
    })
  }
}

module.exports = validatePlaceId;