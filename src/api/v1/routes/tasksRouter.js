const {
  createTask,
  getTasksByProjectId,
} = require("../controllers/tasksController");
const { isAuthenticated } = require("../controllers/usersController");

const tasksRouter = require("express").Router();

tasksRouter.post("/", isAuthenticated, createTask);
tasksRouter.get("/", isAuthenticated, getTasksByProjectId);

module.exports = tasksRouter;
