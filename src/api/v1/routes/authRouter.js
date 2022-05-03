const { signup } = require("../controllers/authController");

const authRouter = require("express").Router();

authRouter.post("/signup", signup);

module.exports = authRouter;
