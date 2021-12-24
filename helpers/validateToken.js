const jwt = require('jsonwebtoken');

function validateToken (token) {
  return jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
    if (err) return '';
    else if (decoded._id) return decoded._id;
    else return '';
  });
}

module.exports = validateToken;