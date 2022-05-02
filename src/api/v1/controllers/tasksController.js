const httpStatus = require("http-status");
const db = require("../../../db");

exports.createTask = async (req, res, next) => {
  try {
    const { title, projectId } = req.body;

    const project = await db.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      res.status(400);
      throw new Error("Invalid project id");
    }
    const task = await db.task.create({
      data: {
        title,
        projectId,
      },
    });

    return res.status(httpStatus.CREATED).json({
      ok: true,
      result: {
        task,
      },
    });
  } catch (err) {
    return next(err);
  }
};
