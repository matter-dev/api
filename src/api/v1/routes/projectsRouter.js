const {
  createProject,
  getProjects,
  getProjectById,
} = require("../controllers/projectsController");
const { isAuthenticated } = require("../controllers/usersController");

const projectsRouter = require("express").Router();

projectsRouter.post("/", isAuthenticated, createProject);
projectsRouter.get("/", isAuthenticated, getProjects);
projectsRouter.get("/:id", isAuthenticated, getProjectById);

module.exports = projectsRouter;
