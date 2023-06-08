const db = require("../../database");

class AnswerRepository {
  static async saveOne(data) {
    const answer = await db.answer.create({ data });
    return answer;
  }

  static async findOne(whereCondition) {
    const answer = await db.answer.findUnique({
      where: whereCondition,
    });

    return answer;
  }

  static async updateOne(whereCondition, data) {
    const answer = await db.answer.update({
      where: whereCondition,
      data,
    });

    return answer;
  }
}

module.exports = AnswerRepository;
