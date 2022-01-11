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
  try {
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
    res.status(200).json({ displayName, token });
  } catch {
    res.status(500).json({ error:'E0' });
  }
}

async function signIn (req, res = response) {
  try {
    const { 
      userInformation,
      password
    } = req.body;
    if (!userInformation)
      return res.status(400).json({ error:'E2' });
    const result = comparePasswords(password, userInformation.password);
    if (!result)
      return res.status(400).json({ error:'E3' });
    const token = tokenCreator(userInformation._id);
    res.status(200).json({ 
      ok:true, 
      displayName:userInformation.displayName, 
      token
    });
  } catch {
    res.status(500).json({ error:'E0' });
  }
}

async function validateUserToken (req, res = response) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ error:'E4' });
    const _id = validateToken(authorization.split(' ')[1]); 
    if (!_id) return res.status(400).json({ error:'E5' });
    const savedUser = await User.findById(_id);
    if (!savedUser) return res.status({ error:'E5' });
    const newToken = tokenCreator(_id);
    res.json({ 
      token:newToken, 
      displayName:savedUser.displayName
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  signUp,
  signIn,
  validateUserToken
}