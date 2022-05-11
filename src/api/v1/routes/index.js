const router = require("express").Router();
const authRouter = require("./authRouter");
const profilesRouter = require("./profilesRouter");
const projectsRouter = require("./projectsRouter");
const tasksRouter = require("./tasksRouter");
const usersRouter = require("./usersRouter");

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/profiles", profilesRouter);
router.use("/projects", projectsRouter);
router.use("/tasks", tasksRouter);

module.exports = router;
