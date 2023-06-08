const BadRequestError = require("../../helpers/error");
const rep = require("./training.repository");

async function getAllTraining(query, pagination = {}) {
  const { name, status, departement } = query;
  const { page, limit } = pagination;

  const fullQuery = {
    where: {
      name: name ? { contains: name } : undefined,
      status: status ? { equals: status } : undefined,
      author: {
        departement: departement ? { equals: departement } : undefined,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          departement: true,
          role: true,
        },
      },
      participants: {
        select: {
          fullName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: page !== null ? (page - 1) * limit : undefined,
    take: page !== null ? limit : undefined,
  };

  const trainings = await rep.findAll(fullQuery);

  let pageData = {};
  if (page !== null) {
    const total = await rep.count(fullQuery.where);

    pageData = {
      pagination: {
        currentPage: page,
        total,
        from: (page - 1) * limit + 1,
        to: page * limit > total ? total : page * limit,
        perPage: limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  return { data: trainings, ...pageData };
}

async function getAllScheduleTraining() {
  const trainings = await rep.findAll({
    where: {
      OR: [{ status: "approved" }, { status: "ongoing" }],
    },
    select: {
      id: true,
      name: true,
      organizer: true,
      location: true,
      heldAt: true,
    },
  });

  return trainings;
}

async function getTrainingById(id) {
  if (typeof id !== "string") {
    throw new Error("ID must be a string");
  }

  const training = await rep.findOne({ id });

  if (!training) {
    throw new BadRequestError("Data not found");
  }

  return training;
}

async function updateTrainingOverToApproved(id) {
  const training = await rep.updateAll(
    {
      status: "ongoing",
      heldAt: { lte: new Date() },
    },
    { status: "approved" }
  );

  return training;
}

async function getTrainingIncluded(id, include) {
  if (typeof id !== "string") {
    throw new Error("ID must be a string");
  }

  const training = await rep.findOne({ id }, include);

  if (!training) {
    throw new BadRequestError("Data not found");
  }

  return training;
}

async function getTrainingOngoing(id) {
  const training = await getTrainingById(id);

  if (training.status !== "ongoing") {
    throw new BadRequestError("Training is not ongoing");
  }

  return training;
}

async function getTrainingOngoingIncluded(id, include) {
  const training = await getTrainingIncluded(id, include);

  if (training.status !== "ongoing") {
    throw new BadRequestError("Training is not ongoing");
  }

  return training;
}

async function createTraining(data) {
  return await rep.saveOne(data);
}

async function updateTrainingStatusById(id, status) {
  const training = await getTrainingById(id);

  if (training.status !== "requested") {
    throw new BadRequestError("Training status is not requested");
  }

  return await rep.updateOne({ id }, { status });
}

module.exports = {
  createTraining,
  getTrainingById,
  updateTrainingStatusById,
  getAllTraining,
  getAllScheduleTraining,
  getTrainingIncluded,
  getTrainingOngoingIncluded,
  getTrainingOngoing,
  updateTrainingOverToApproved,
};
