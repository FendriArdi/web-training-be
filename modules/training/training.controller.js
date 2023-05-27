const router = require("express").Router();
const BadRequestError = require("../../helpers/error");
const { response } = require("../../helpers/response");
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");
const validation = require("../../middlewares/validation");
const {
  createTraining,
  updateTrainingStatusById,
  getAllTraining,
  getAllScheduleTraining,
} = require("./training.service");
const { store, update } = require("./training.validator");

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
    const { participants, heldAt, ...payload } = req.body;

    const authorId = res.locals.user.id;
    const mappedParticipants = participants.map((participant) => {
      return {
        fullName: participant,
      };
    });

    try {
      const newTraining = await createTraining({
        ...payload,
        heldAt: new Date(heldAt),
        authorId,
        participants: { create: mappedParticipants },
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

router.use(authorization("admin"));
router.put("/:id", validation(update()), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const training = await updateTrainingStatusById(parseInt(id), status);

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
});

router.get("/schedule", async (req, res) => {
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

module.exports = router;
