const {
  createUser,
  signIn,
  getAuthStatus,
} = require("../controllers/usersController");

const usersRouter = require("express").Router();

usersRouter.post("/", createUser);
usersRouter.post("/signin", signIn);
usersRouter.get("/me", getAuthStatus);

module.exports = usersRouter;
