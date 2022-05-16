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

exports.getTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.query;

    if (!projectId) {
      res.status(400);
      throw new Error("No project id provided");
    }

    const tasks = await db.task.findMany({
      where: {
        projectId: +projectId,
      },
    });

    return res.json({
      ok: true,
      result: {
        tasks,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await db.task.findFirst({
      where: {
        id: +id,
      },
    });

    if (!task) {
      res.status(404);
      throw new Error("Invalid Task ID provided");
    }

    return res.json({
      ok: true,
      result: {
        task,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.patchTask = async (req, res, next) => {
  try {
    const { title, description, priority, status } = req.body;

    const { id } = req.params;

    await db.task.update({
      where: {
        id: +id,
      },
      data: {
        title,
        description,
        priority,
        status,
      },
    });

    return res.json({
      ok: true,
      result: {
        task,
      },
    });
  } catch (err) {
    return next(err);
  }
};
