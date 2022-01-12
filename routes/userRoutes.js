// Modules
const { Router } = require('express');
const { body } = require('express-validator');

// Controllers
const { 
  signUp, 
  signIn, 
  validateUserToken
} = require('../controllers/userControllers');

// Middlewares
const validateEmail = require('../middlewares/validateEmail');
const validateInformation = require('../middlewares/validateInformation');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.post(
  '/sign-up', 
  [
    body('email').isEmail(),
    body('password').isString(),
    body('displayName').isString(),
    validateInformation,
    validateEmail,
  ], 
  signUp
);

router.post(
  '/sign-in',
  [
    body('email').isEmail(),
    body('password').isString(),
    validateInformation,
    validateEmail,
  ],
  signIn
);

router.get('/validate-token', validateToken, validateUserToken);

module.exports = router;
