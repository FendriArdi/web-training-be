const router = require("express").Router();
const BadRequestError = require("../../helpers/error");
const { response } = require("../../helpers/response");
const authentication = require("../../middlewares/authentication");
const {
  authorization,
  trainingAuthorization,
} = require("../../middlewares/authorization");
const validation = require("../../middlewares/validation");
const {
  createTraining,
  updateTrainingStatusById,
  getAllTraining,
  getAllScheduleTraining,
  getTrainingIncluded,
  updateTrainingOverToApproved,
} = require("./training.service");
const { v4: uuid4 } = require("uuid");
const { store, update } = require("./training.validator");
const { getAnswerById } = require("../answer/answer.service");

router.use(authentication());
router.get("/", async (req, res) => {
  const { page, limit, ...query } = req.query;

  const pageInt = parseInt(page) || 0;
  const limitInt = parseInt(limit) || 10;

  const pagination = {
    page: pageInt !== 0 ? pageInt : null,
    limit: limitInt,
  };

  if (res.locals.user.role === "user") {
    query.departement = res.locals.user.departement;
  }

  try {
    await updateTrainingOverToApproved();
    const data = await getAllTraining(query, pagination);

    return response({
      res,
      code: 200,
      message: "Data retrieved",
      ...data,
    });
  } catch (err) {
    return response({ res, code: 500, message: err });
  }
});

router.post(
  "/",
  authorization("user"),
  validation(store()),
  async (req, res) => {
    const { participants, questions, heldAt, ...payload } = req.body;

    const authorId = res.locals.user.id;
    const mappedQuestions = questions.map((question) => ({ text: question }));
    const mappedParticipants = participants.map((participant) => ({
      fullName: participant,
    }));

    try {
      const id = uuid4();
      const newTraining = await createTraining({
        ...payload,
        id,
        heldAt: new Date(heldAt),
        authorId,
        participants: { create: mappedParticipants },
        questions: { create: mappedQuestions },
      });

      return response({
        res,
        code: 201,
        message: "Training created",
        data: newTraining,
      });
    } catch (err) {
      return response({ res, code: 500, message: err });
    }
  }
);

router.get("/schedule", authorization("admin"), async (_, res) => {
  try {
    const trainings = await getAllScheduleTraining();

    return response({
      res,
      code: 200,
      message: "Data retrieved",
      data: trainings,
    });
  } catch (err) {
    return response({ res, code: 400, message: err });
  }
});

router.get("/:id", trainingAuthorization(), async (req, res) => {
  const { id } = req.params;
  const user = res.locals.user;

  try {
    const training = await getTrainingIncluded(id, {
      questions: {
        select: { id: true, text: true },
      },
      answers: { select: { id: true, participant: true } },
    });

    return response({
      res,
      code: 200,
      message: "Data retrieved",
      data: training,
    });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return response({ res, code: err.statusCode, message: err.message });
    }

    return response({ res, code: 500, message: err });
  }
});

router.get("/:id/:answerId", trainingAuthorization(), async (req, res) => {
  const { id, answerId } = req.params;

  try {
    const answer = await getAnswerById(parseInt(answerId), id);

    return response({
      res,
      code: 200,
      message: "Data retrieved",
      data: {
        ...answer,
        results: JSON.parse(answer.results),
      },
    });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return response({ res, code: err.statusCode, message: err.message });
    }

    return response({ res, code: 500, message: err });
  }
});

router.put(
  "/:id",
  authorization("admin"),
  validation(update()),
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const training = await updateTrainingStatusById(id, status);

      return response({
        res,
        code: 200,
        message: "Training updated",
        data: training,
      });
    } catch (err) {
      if (err instanceof BadRequestError) {
        return response({ res, code: err.statusCode, message: err.message });
      }

      return response({ res, code: 500, message: err });
    }
  }
);

module.exports = router;
