const rep = require("./training.repository");

async function getAllTraining(pagination, query) {
  const { page, limit } = pagination;
  const { name, status, departement } = query;

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
      status: "approved",
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
  if (typeof id !== "number") {
    throw Error("ID must be a number");
  }

  return await rep.findOne({ id });
}

async function createTraining(data) {
  return await rep.saveOne(data);
}

async function updateTrainingStatusById(id, status) {
  const training = await getTrainingById(id);

  if (!training) {
    throw Error("Data not found");
  }

  if (training.status !== "requested") {
    throw Error("Training status is not requested");
  }

  return await rep.updateOne({ id }, { status });
}

module.exports = {
  createTraining,
  getTrainingById,
  updateTrainingStatusById,
  getAllTraining,
  getAllScheduleTraining,
};
