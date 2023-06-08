const BadRequestError = require("../../helpers/error");
const rep = require("./answer.repository");

async function createAnswer(data) {
  const answer = await rep.saveOne(data);
  return answer;
}

async function getAnswerById(id, trainingId) {
  if (typeof id !== "number") {
    throw Error("ID must be a number");
  }

  if (typeof trainingId !== "string") {
    throw Error("Training ID must be a string");
  }

  const training = await rep.findOne({ id });

  if (!training || training.trainingId !== trainingId) {
    throw new BadRequestError("Data not found");
  }

  return training;
}

module.exports = { getAnswerById, createAnswer };
