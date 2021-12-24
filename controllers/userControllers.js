// Modules
const { response } = require('express');
const comparePasswords = require('../helpers/comparePasswords');

// Helpers
const hashPassword = require('../helpers/hashPassword');
const tokenCreator = require('../helpers/tokenCreator');
const validateToken = require('../helpers/validateToken');

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

async function signIn (req, res = response) {
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

async function validateUserToken (req, res = response) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ ok:false, error:'E4' });
    const _id = validateToken(authorization.split(' ')[1]); 
    if (!_id) return res.status(400).json({ ok:false, error:'E5' });
    const savedUser = await User.findById(_id);
    if (!savedUser) return res.status({ ok:false, error:'E5' });
    const newToken = tokenCreator(_id);
    res.json({ 
      ok:true, 
      token:newToken, 
      displayName:savedUser.displayName
    });
  } catch (error) {
    res.status(500).json({ ok:false, error });
  }
}

module.exports = {
  signUp,
  signIn,
  validateUserToken
}