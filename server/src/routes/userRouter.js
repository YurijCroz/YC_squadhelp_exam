"use strict";
const { Router } = require("express");
const basicMiddleware = require("../middleware/basicMiddleware");
const userController = require("../controllers/userController");
const checkToken = require("../middleware/checkToken");
const upload = require("../utils/fileUpload");

const usersRouter = Router();

usersRouter.post("/getUser", checkToken.checkAuth);

usersRouter.post(
  "/changeMark",
  checkToken.checkToken,
  basicMiddleware.onlyForCustomer,
  userController.changeMark
);

usersRouter.post(
  "/updateUser",
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

module.exports = usersRouter;
