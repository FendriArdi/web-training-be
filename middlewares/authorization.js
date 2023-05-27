const { response } = require("../helpers/response");

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

module.exports = authorization;
