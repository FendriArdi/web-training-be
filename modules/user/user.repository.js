const db = require("../../db");

class UserRepository {
  static async findOne(whereCondition) {
    const user = await db.user.findUnique({
      where: whereCondition,
    });

    return user;
  }

  static async updateOne(whereCondition, data) {
    const user = await db.user.update({
      where: whereCondition,
      data,
    });

    return user;
  }
}

module.exports = UserRepository;
