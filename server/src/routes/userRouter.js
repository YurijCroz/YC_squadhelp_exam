"use strict";
const { Router } = require("express");
const checkRoles = require("../middleware/checkRoles");
const userController = require("../controllers/userController");
const checkToken = require("../middleware/checkToken");
const upload = require("../utils/fileUpload");

const usersRouter = Router();

usersRouter.get("/getUser", checkToken.checkAuth);

usersRouter.patch(
  "/changeMark/:creatorId",
  checkToken.checkToken,
  checkRoles.onlyForCustomer,
  userController.changeMark
);

usersRouter.patch(
  "/updateUser",
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

module.exports = usersRouter;
