const bcrypt = require("bcrypt");
const saltRounds = process.env.HASH_SALT || 10;

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(parseInt(saltRounds));
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, comparePassword };
