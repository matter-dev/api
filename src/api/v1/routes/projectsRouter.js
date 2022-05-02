const {
  createProject,
  getProjects,
} = require("../controllers/projectsController");
const { isAuthenticated } = require("../controllers/usersController");

const projectsRouter = require("express").Router();

projectsRouter.post("/", isAuthenticated, createProject);
projectsRouter.get("/", isAuthenticated, getProjects);

module.exports = projectsRouter;
