const router = require("express").Router();
const usersRouter = require("./usersRouter");

router.use("/users", usersRouter);

module.exports = router;
