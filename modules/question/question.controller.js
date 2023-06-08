const router = require("express").Router();
const { response } = require("../../helpers/response");
const BadRequestError = require("../../helpers/error");
const {
  getTrainingOngoingIncluded,
  getTrainingOngoing,
} = require("../training/training.service");
const validation = require("../../middlewares/validation");
const { store } = require("./question.validator");
const { createAnswer } = require("../answer/answer.service");

router.get("/:trainingId", async (req, res) => {
  const { trainingId } = req.params;

  try {
    const data = await getTrainingOngoingIncluded(trainingId, {
      questions: { select: { id: true, text: true } },
    });

    return response({
      res,
      code: 200,
      message: "Data retrieved",
      data,
    });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return response({ res, code: err.statusCode, message: err.message });
    }

    return response({ res, code: 500, message: err });
  }
});

router.post("/:trainingId", validation(store()), async (req, res) => {
  const { trainingId } = req.params;
  const { participant, results } = req.body;

  try {
    const training = await getTrainingOngoing(trainingId);
    const newAnswer = await createAnswer({
      participant,
      results: JSON.stringify(results),
      trainingId: training.id,
    });

    return response({
      res,
      code: 201,
      message: "Data created",
      data: newAnswer,
    });
  } catch (err) {
    return response({ res, code: 500, message: err });
  }
});

module.exports = router;
