const express = require("express");
const cors = require("cors");
const { response } = require("./helpers/response");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const api = express.Router();

api.use("/", require("./modules/user/user.controller"));
api.use("/training", require("./modules/training/training.controller"));
api.use("/questions", require("./modules/question/question.controller"));

app.use("/api", api);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

function notFound(_, res) {
  return response({ res, code: 404, message: "Not found" });
}
