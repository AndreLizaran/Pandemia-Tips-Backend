const bcryptjs = require('bcryptjs');

function comparePasswords (password, hash) {
  return bcryptjs.compareSync(password, hash);
}

module.exports = comparePasswords;