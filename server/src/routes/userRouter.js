"use strict";
const { Router } = require("express");
const checkRoles = require("../middleware/checkRoles");
const userController = require("../controllers/userController");
const checkToken = require("../middleware/checkToken");
const upload = require("../utils/fileUpload");

const usersRouter = Router();

usersRouter.post("/getUser", checkToken.checkAuth);

usersRouter.post(
  "/changeMark",
  checkToken.checkToken,
  checkRoles.onlyForCustomer,
  userController.changeMark
);

usersRouter.post(
  "/updateUser",
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

module.exports = usersRouter;
