const jwt = require('jsonwebtoken');

function tokenCreator (idUser) {
  return jwt.sign({ _id:idUser }, process.env.JWT_PASSWORD );
}

module.exports = tokenCreator;