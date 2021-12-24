const bcryptjs = require('bcryptjs');

function hashPassword (password) {
  const salt = bcryptjs.genSaltSync();
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
}

module.exports = hashPassword;