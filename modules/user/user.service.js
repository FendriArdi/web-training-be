const rep = require("./user.repository");

async function getUserByName(username) {
  if (!username) {
    return null;
  }

  return await rep.findOne({ username });
}

async function updateUserById(id, data) {
  if (typeof id !== "number") {
    throw Error("ID must be a number");
  }

  return await rep.updateOne({ id }, data);
}

module.exports = { getUserByName, updateUserById };
