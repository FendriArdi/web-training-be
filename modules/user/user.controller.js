const router = require("express").Router();
const { response } = require("../../helpers/response");
const { getUserByName } = require("./user.service");
const validation = require("../../middlewares/validation");
const loginValidator = require("./user.validator");
const { comparePassword } = require("../../helpers/bcrypt");
const { generateToken } = require("../../helpers/jwt");

router.use(validation(loginValidator()));
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByName(username);

    if (!comparePassword(password, user?.password)) {
      response({ res, code: 400, message: "Invalid email or password" });
    }

    const data = exclude(user, ["password", "token"]);
    const token = generateToken(user);

    response({ res, code: 200, data: user });
  } catch (err) {
    response({ res, code: 500, message: err });
  }
});

module.exports = router;
