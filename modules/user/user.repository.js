const db = require("../../db");

async function findOne(whereCondition) {
  const user = await db.user.findUnique({
    where: whereCondition,
  });

  return user;
}

module.exports = { findOne };
