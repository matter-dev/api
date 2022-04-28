const {
  createUser,
  signIn,
  getAuthStatus,
  findUserByEmail,
} = require("../controllers/usersController");

const usersRouter = require("express").Router();

usersRouter.post("/", createUser);
usersRouter.post("/signin", signIn);
usersRouter.post("/check", findUserByEmail);
usersRouter.get("/me", getAuthStatus);

module.exports = usersRouter;
