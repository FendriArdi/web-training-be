const { verifyToken } = require("../helpers/jwt");
const { response } = require("../helpers/response");
const { getUserByName } = require("../modules/user/user.service");

function authentication() {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const [authHeaderName, token] = authHeader?.split(" ");

      if (authHeaderName !== "Bearer" || !token) throw new Error();

      const data = verifyToken(token);
      const user = await getUserByName(data.username);

      if (user?.token !== token) throw new Error();

      res.locals.user = data;

      next();
    } catch (err) {
      return response({ res, code: 401, message: "Unauthorized" });
    }
  };
}

module.exports = authentication;
