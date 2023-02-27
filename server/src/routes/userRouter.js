"use strict";
const { Router } = require("express");
const basicMiddleware = require("../middleware/basicMiddleware");
const userController = require("../controllers/userController");
const contestController = require("../controllers/contestController");
const checkToken = require("../middleware/checkToken");
const upload = require("../utils/fileUpload");

const usersRouter = Router();

usersRouter.post("/getUser", checkToken.checkAuth);

usersRouter.get(
  "/downloadFile/:fileName",
  checkToken.checkToken,
  contestController.downloadFile
);

usersRouter.post(
  "/setNewOffer",
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddleware.canSendOffer,
  contestController.setNewOffer
);

usersRouter.post(
  "/setOfferStatus",
  checkToken.checkToken,
  basicMiddleware.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

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
