const router = require("express").Router();
const { response, exclude } = require("../../helpers/response");
const userService = require("./user.service");
const validation = require("../../middlewares/validation");
const loginValidator = require("./user.validator");
const { comparePassword } = require("../../helpers/bcrypt");
const { generateToken } = require("../../helpers/jwt");
const BadRequestError = require("../../helpers/error");

router.post("/login", validation(loginValidator()), async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.getUserByName(username);

    if (!comparePassword(password, user?.password || "")) {
      throw new BadRequestError("Invalid email or password");
    }

    const data = exclude(user, ["password", "token"]);
    const token = generateToken(user);

    await userService.updateUserById(user.id, { token });

    return response({
      res,
      code: 200,
      message: "Login successfully",
      data,
      token: {
        type: "Bearer",
        value: token,
      },
    });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return response({ res, code: err.statusCode, message: err.message });
    }

    return response({ res, code: 500, message: err });
  }
});

module.exports = router;
