const httpStatus = require("http-status");
const db = require("../../../db");

exports.getProjects = async (req, res, next) => {
  try {
    const {
      user: { id: userId },
    } = req;

    const profile = await db.profile.findFirst({
      where: {
        userId,
      },
      include: {
        projects: true,
      },
    });

    return res.json({
      ok: true,
      result: {
        projects,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { title } = req.body;
    const {
      user: { id: userId },
    } = req;

    const profile = await db.profile.findFirst({
      where: {
        userId,
      },
    });

    const project = await db.task.create({
      data: {
        title,
        creatorId: profile.id,
      },
    });

    return res.status(httpStatus.CREATED).json({
      ok: true,
      result: {
        project,
      },
    });
  } catch (err) {
    return next(err);
  }
};
