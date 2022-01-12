// Modules
const { response } = require('express');

// Models
const Place = require('../models/Place')

async function validatePlaceId (req, res = response, next) {
  try {
    const { idPlace } = req.params;
    if (!idPlace) res.status(400).json({ ok:false, error:'Id no entregado' });
    const savedPlace = await Place.findById(idPlace);
    if (!savedPlace) return res.status(400).json({ ok:false, error:'Lugar no existente' });
    req.body.placeInformation = savedPlace;
    next();
  } catch (error) {
    res.status(500).json({ ok:false, error:'Error del servidor' });
  }
}

module.exports = validatePlaceId;