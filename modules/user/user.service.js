const rep = require("./user.repository");

async function getUserByName(username) {
  if (!username) {
    return null;
  }

  return await rep.findOne({ username });
}

async function updateUserById(id, data) {
  return await rep.updateOne({ id }, data);
}

module.exports = { getUserByName, updateUserById };
