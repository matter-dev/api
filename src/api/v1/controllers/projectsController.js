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
        projects: profile.projects,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { name } = req.body;
    const {
      user: { id: userId },
    } = req;

    const profile = await db.profile.findFirst({
      where: {
        userId,
      },
    });

    const project = await db.project.create({
      data: {
        name,
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

exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await db.project.findFirst({
      where: {
        id: +id,
      },
      include: {
        tasks: true,
      },
    });

    if (!project) {
      res.status(httpStatus.NOT_FOUND);
      throw new Error("Project does not exist");
    }

    return res.json({
      ok: true,
      result: {
        project,
      },
    });
  } catch (err) {
    return next(err);
  }
};
