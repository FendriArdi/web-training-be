const BadRequestError = require("../helpers/error");
const { response } = require("../helpers/response");
const { getTrainingById } = require("../modules/training/training.service");

function authorization(role) {
  return async function (_, res, next) {
    try {
      const user = res.locals.user;

      if (user.role !== role) throw new Error();

      next();
    } catch (err) {
      return response({
        res,
        code: 403,
        message: "The user does not have access",
      });
    }
  };
}

function trainingAuthorization() {
  return async function (req, res, next) {
    try {
      const { id } = req.params;
      const user = res.locals.user;

      const training = await getTrainingById(id);

      if (training.authorId !== user.id && user.role === "user") {
        throw new Error();
      }

      next();
    } catch (err) {
      if (err instanceof BadRequestError) {
        return response({ res, code: err.statusCode, message: err.message });
      }

      return response({
        res,
        code: 403,
        message: "The user does not have access",
      });
    }
  };
}

module.exports = { authorization, trainingAuthorization };
