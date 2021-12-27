// Modules
const { Router } = require('express');

// Controllers
const {
  getPlaceInformation,
  getPlacesInformation
} = require('../controllers/placeControllers');

// Middlewares
const validatePlaceId = require('../middlewares/validatePlaceId');

const router = Router();

router.get(
  '/places-information', 
  getPlacesInformation
);

router.get(
  '/place-information/:idPlace', 
  validatePlaceId, 
  getPlaceInformation
);

module.exports = router;