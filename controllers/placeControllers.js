// Modules
const { response } = require('express');

// Models
const Place = require('../models/Place');

async function getPlacesInformation (req, res = response) {
  try {
    const places = await Place.find({});
    const mapPlaces = places.map((place) => ({
      title:place.title,
      description:place.description,
      images:place.images,
      rate:place.rate
    }));
    res.json({ ok:true, data:mapPlaces });
  } catch {
    res.status(500).json({ ok:false, error:'E0' });
  }
}

async function getPlaceInformation (req, res = response) {
  try {
    const { placeInformation } = req.body;
    res.json({ ok:true, data:placeInformation });
  } catch {
    res.status(500).json({ ok:false, error:'E0' });
  }
}

module.exports = {
  getPlacesInformation,
  getPlaceInformation
}