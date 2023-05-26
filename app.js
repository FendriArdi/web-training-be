const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./modules/user/user.controller"));
app.use(notFound);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

function notFound(_, res) {
  return res.status(404).send("Not found");
}
