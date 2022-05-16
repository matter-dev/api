const {
  createTask,
  getTasksByProjectId,
  getTaskById,
  patchTask,
} = require("../controllers/tasksController");
const { isAuthenticated } = require("../controllers/usersController");

const tasksRouter = require("express").Router();

tasksRouter.post("/", isAuthenticated, createTask);
tasksRouter.get("/", isAuthenticated, getTasksByProjectId);
tasksRouter.get("/:id", isAuthenticated, getTaskById);
tasksRouter.patch("/:id", isAuthenticated, patchTask);

module.exports = tasksRouter;
