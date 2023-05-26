const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(user, getSecretKey());
}

function verifyToken(token) {
  return jwt.verify(token, getSecretKey());
}

function getSecretKey() {
  return process.env.SECRET_KEY || "secret";
}

module.exports = { generateToken, verifyToken };
