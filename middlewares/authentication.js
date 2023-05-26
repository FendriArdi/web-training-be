// const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
const { response } = require("../helpers/response");

function authentication() {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const [authHeaderName, token] = authHeader?.split(" ");

      if (authHeaderName !== "Bearer" || !token) throw Error();

      const data = verifyToken(token);
      const user = await User.findOne({ where: { id: data.id } });

      if (user?.token !== token) throw Error();

      res.locals.user = data;

      next();
    } catch (err) {
      return response({ res, code: 401, message: "Unauthorized" });
    }
  };
}

module.exports = authentication;
