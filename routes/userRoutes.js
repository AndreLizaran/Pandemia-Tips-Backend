// Modules
const { Router } = require('express');
const { body } = require('express-validator');

// Controllers
const { 
  signUp, 
  signIn 
} = require('../controllers/userControllers');

// Middlewares
const validateEmail = require('../middlewares/validateEmail');
const validateInformation = require('../middlewares/validateInformation');

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

router.get('/token');

module.exports = router;
