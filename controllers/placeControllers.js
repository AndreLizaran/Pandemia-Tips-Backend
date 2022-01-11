// Modules
const { response } = require('express');

// Models
const Place = require('../models/Place');

async function getPlacesInformation (req, res = response) {
  try {
    const places = await Place.find({});
    const mapPlaces = places.map((place) => ({
      _id:place._id,
      title:place.title,
      description:place.description,
      images:place.images,
      rate:place.rate
    }));
    res.json(mapPlaces);
  } catch {
    res.status(500).json({ error:'E0' });
  }
}

async function getPlaceInformation (req, res = response) {
  try {
    const { placeInformation } = req.body;
    res.json(placeInformation);
  } catch {
    res.status(500).json({ error:'E0' });
  }
}

module.exports = {
  getPlacesInformation,
  getPlaceInformation
}