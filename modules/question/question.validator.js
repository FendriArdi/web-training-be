const { body } = require("express-validator");

function store() {
  return [
    body("participant").notEmpty().withMessage("Name is required"),
    body("results")
      .notEmpty()
      .withMessage("Results is required")
      .isArray({ min: 1 })
      .withMessage("Results must be an array"),
  ];
}

module.exports = { store };
