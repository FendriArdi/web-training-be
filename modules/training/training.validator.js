const { body } = require("express-validator");

function store() {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("purpose").notEmpty().withMessage("Purpose is required"),
    body("organizer")
      .notEmpty()
      .withMessage("Organizer is required")
      .isIn(["internal", "external"])
      .withMessage(`Organizer must be internal or external`),
    body("location").notEmpty().withMessage("Location is required"),
    body("cost").custom((value) => {
      if (!!value && typeof value !== "number") {
        throw new Error("Cost must be a number");
      }

      return true;
    }),
    body("heldAt")
      .notEmpty()
      .withMessage("Held at is required")
      .isISO8601()
      .withMessage("Held at must be a date"),
    body("participants")
      .notEmpty()
      .withMessage("Participants is required")
      .isArray({ min: 1 })
      .withMessage("Participants must be an array"),
    body("questions")
      .notEmpty()
      .withMessage("Questions is required")
      .isArray({ min: 1 })
      .withMessage("Questions must be an array"),
  ];
}

function update() {
  return [
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["ongoing", "rejected"])
      .withMessage("Status must be ongoing or rejected"),
  ];
}

module.exports = { store, update };
