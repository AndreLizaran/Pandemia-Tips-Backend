// Modules
const { Router } = require('express');

// Controllers
const {
  getPlaceInformation,
  getPlacesInformation,
  getPlacesByCategories,
  addPlaceToFavorites,
  removePlaceFromFavorites
} = require('../controllers/placeControllers');

// Middlewares
const validatePlaceId = require('../middlewares/validatePlaceId');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.get(
  '/', 
  getPlacesInformation
);

router.get(
  '/place-information/:idPlace', 
  validatePlaceId, 
  getPlaceInformation
);

router.get(
  '/category/:category',
  getPlacesByCategories
)

router.get(
  '/add-favorite/:idPlace', 
  [
    validateToken,
    validatePlaceId,
  ],
  addPlaceToFavorites,
);

router.get(
  '/remove-favorite/:idPlace', 
  [
    validateToken,
    validatePlaceId,
  ],
  removePlaceFromFavorites,
);

module.exports = router;