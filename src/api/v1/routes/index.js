const router = require("express").Router();
const profilesRouter = require("./profilesRouter");
const projectsRouter = require("./projectsRouter");
const tasksRouter = require("./tasksController");
const usersRouter = require("./usersRouter");

router.use("/users", usersRouter);
router.use("/profiles", profilesRouter);
router.use("/projects", projectsRouter);
router.use("/tasks", tasksRouter);

module.exports = router;
