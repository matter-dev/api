const router = require("express").Router();
const profilesRouter = require("./profilesRouter");
const tasksRouter = require("./tasksController");
const usersRouter = require("./usersRouter");

router.use("/users", usersRouter);
router.use("/profiles", profilesRouter);
router.use("/tasks", tasksRouter);

module.exports = router;
