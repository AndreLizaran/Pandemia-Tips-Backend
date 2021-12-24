// Modules
const { response } = require('express');
const comparePasswords = require('../helpers/comparePasswords');

// Helpers
const hashPassword = require('../helpers/hashPassword');
const tokenCreator = require('../helpers/tokenCreator');

// Models
const User = require('../models/User');

async function signUp (req, res = response) {
  const { 
    userInformation, 
    displayName, 
    password, 
    email
  } = req.body;
  if (userInformation) 
    return res.status(400).json({ ok:false, error:'E1' });
  const newPassword = hashPassword(password);
  const newUser = new User({ displayName, email, password:newPassword });
  await newUser.save();
  const token = tokenCreator(newUser._id);
  res.status(200).json({ ok:true, displayName, token });
}

function signIn (req, res = response) {
  const { 
    userInformation,
    password
  } = req.body;
  if (!userInformation)
    return res.status(400).json({ ok:false, error:'E2' });
  const result = comparePasswords(password, userInformation.password);
  if (!result)
    return res.status(400).json({ ok:false, error:'E3' });
  const token = tokenCreator(userInformation._id);
  res.status(200).json({ 
    ok:true, 
    displayName:userInformation.displayName, 
    token
  });
}

function validateToken (req, res = response) {
  res.json({ ok:true });
}

module.exports = {
  signUp,
  signIn,
  validateToken
}