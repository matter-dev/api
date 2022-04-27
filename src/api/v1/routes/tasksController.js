const { createTask } = require("../controllers/tasksController");
const { isAuthenticated } = require("../controllers/usersController");

const tasksRouter = require("express").Router();

tasksRouter.post("/", isAuthenticated, createTask);

module.exports = tasksRouter;
