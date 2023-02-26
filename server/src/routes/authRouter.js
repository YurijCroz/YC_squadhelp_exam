"use strict";
const { Router } = require("express");
const userController = require("./../controllers/userController.js");
const checkToken = require("../middlewares/checkToken");
const hashPass = require("../middlewares/hashPassMiddle");
const validators = require("../middlewares/validators");

const authRouter = Router();

authRouter.post(
  "/registration",
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

authRouter.post(
  "/login",
  validators.validateLogin,
  userController.login
);

authRouter.post(
  "/refresh",
  checkToken.checkRefreshToken,
  userController.refreshToken
);

module.exports = authRouter;
