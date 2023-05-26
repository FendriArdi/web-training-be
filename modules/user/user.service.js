const { findOne } = require("./user.repository");

async function getUserByName(username) {
  if (!username) {
    return null;
  }

  return await findOne({ username });
}

async function updateUser(id, data) {
  return await update({ id }, data);
}

module.exports = { getUserByName };
