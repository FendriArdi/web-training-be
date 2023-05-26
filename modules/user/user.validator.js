const { body } = require("express-validator");

function login() {
  return [
    body("username").notEmpty().withMessage("username is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
}

module.exports = login;
