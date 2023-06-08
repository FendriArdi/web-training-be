const db = require("../../database");

class TrainingRepository {
  static async findAll(query) {
    const trainings = await db.training.findMany(query);
    return trainings;
  }

  static async saveOne(data) {
    const newTraining = await db.training.create({ data });
    return newTraining;
  }

  static async findOne(whereCondition, include = undefined) {
    const training = await db.training.findUnique({
      where: whereCondition,
      include,
    });

    return training;
  }

  static async updateOne(whereCondition, data) {
    const updatedTraining = await db.training.update({
      where: whereCondition,
      data,
    });

    return updatedTraining;
  }

  static async updateAll(whereCondition, data) {
    const updatedTrainings = await db.training.updateMany({
      where: whereCondition,
      data,
    });

    return updatedTrainings;
  }

  static async count(whereCondition) {
    const total = await db.training.count({ where: whereCondition });
    return total;
  }
}

module.exports = TrainingRepository;
