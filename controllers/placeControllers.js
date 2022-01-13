// Modules
const { response } = require('express');
const res = require('express/lib/response');

// Models
const Place = require('../models/Place');
const User = require('../models/User');

async function getPlacesInformation (req, res = response) {
  try {
    const places = await Place.find({});
    const mapPlaces = places.map((place) => ({
      _id:place._id,
      title:place.title,
      description:place.description,
      images:place.images,
      rate:place.rate,
      categories: place.categories
    }));
    res.json(mapPlaces);
  } catch {
    res.status(500).json({ error:'Error del servidor' });
  }
}

async function getPlaceInformation (req, res = response) {
  try {
    const { placeInformation } = req.body;
    res.json(placeInformation);
  } catch {
    res.status(500).json({ error:'Error del servidor' });
  }
}

async function getPlacesByCategories (req, res = response) {
  try {
    const { category } = req.params;
    const places = await Place.find({});
    if (category === 'any') return res.json(places);
    const filteredPlaces = places.filter((place) => {
      if (place.categories.includes(category)) return place;
    });
    res.json(filteredPlaces);
  } catch {
    res.status(500).json({ error:'Error del servidor' });
  }
}

async function addPlaceToFavorites (req, res = response) {
  try {
    const { userInformation } = req.body;
    const { idPlace } = req.params;
    let newFavorites = userInformation.favorites;
    newFavorites.push(idPlace);
    await User.findByIdAndUpdate(userInformation._id, { favorites:newFavorites });
    res.json(newFavorites);
  } catch {
    res.status(500).json({ error:'Error del servidorrr' });
  }
}

async function removePlaceFromFavorites (req, res = response) {
  try {
    const { userInformation } = req.body;
    const { idPlace } = req.params;
    let newFavorites = userInformation.favorites.filter((fav) => {
      if (fav !== idPlace) return fav;
    })
    await User.findByIdAndUpdate(userInformation._id, { favorites:newFavorites });
    res.json(newFavorites);
  } catch {
    res.status(500).json({ error:'Error del servidorrr' });
  }
}

module.exports = {
  getPlacesInformation,
  getPlaceInformation,
  getPlacesByCategories,
  addPlaceToFavorites,
  removePlaceFromFavorites
}