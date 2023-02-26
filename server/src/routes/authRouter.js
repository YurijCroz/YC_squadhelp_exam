"use strict";
const { Router } = require("express");
const authController = require("./../controllers/authController.js");
const checkToken = require("../middlewares/checkToken");
const hashPass = require("../middlewares/hashPassMiddle");
const validators = require("../middlewares/validators");

const authRouter = Router();

authRouter.post(
  "/registration",
  validators.validateRegistrationData,
  hashPass,
  authController.registration
);

authRouter.post(
  "/login",
  validators.validateLogin,
  authController.login
);

authRouter.post(
  "/refresh",
  checkToken.checkRefreshToken,
  authController.refreshToken
);

module.exports = authRouter;
