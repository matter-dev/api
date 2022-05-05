const httpStatus = require("http-status");
const db = require("../../../db");

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, projectId } = req.body;

    const project = await db.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      res.status(httpStatus.BAD_REQUEST);
      throw new Error("Invalid project id");
    }
    const task = await db.task.create({
      data: {
        title,
        projectId,
        description,
        status,
        priority,
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
