const { validationResult } = require("express-validator");
const { response, uniqueValidation } = require("../helpers/response");

function validation(rules) {
  return [
    rules,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return response({
          res,
          code: 400,
          message: "Request validation error",
          errors: uniqueValidation(errors.array()),
        });
      }

      next();
    },
  ];
}

module.exports = validation;
