const { createProfile } = require("../controllers/profilesController");
const { isAuthenticated } = require("../controllers/usersController");

const profilesRouter = require("express").Router();

profilesRouter.post("/", isAuthenticated, createProfile);

module.exports = profilesRouter;
