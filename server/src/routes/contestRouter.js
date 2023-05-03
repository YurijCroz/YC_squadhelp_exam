"use strict";
const { Router } = require("express");
const basicMiddleware = require("../middleware/basicMiddleware");
const contestController = require("../controllers/contestController");
const checkToken = require("../middleware/checkToken");
const upload = require("../utils/fileUpload");

const contestRouter = Router();

contestRouter.get(
  "/dataForContest",
  contestController.dataForContest
);

contestRouter.get(
  "/getCustomersContests",
  checkToken.checkToken,
  basicMiddleware.onlyForCustomer,
  contestController.getCustomersContests
);

contestRouter.get(
  "/getContestById/:contestId",
  checkToken.checkToken,
  // basicMiddleware.canGetContest, // зачем?
  basicMiddleware.onlyForCustomerOrCreative,
  contestController.getContestById
);

contestRouter.get(
  "/getAllContests",
  checkToken.checkToken,
  basicMiddleware.onlyForCreative,
  contestController.getContests
);

contestRouter.patch(
  "/updateContest/:contestId",
  checkToken.checkToken,
  basicMiddleware.onlyForCustomer,
  upload.updateContestFile,
  contestController.updateContest
);

contestRouter.get(
  "/downloadFile/:fileName",
  checkToken.checkToken,
  contestController.downloadFile
);

contestRouter.post(
  "/setNewOffer",
  checkToken.checkToken,
  basicMiddleware.onlyForCreative,
  upload.uploadLogoFiles,
  basicMiddleware.canSendOffer,
  contestController.setNewOffer
);

contestRouter.patch(
  "/setOfferStatus/:offerId",
  checkToken.checkToken,
  basicMiddleware.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

module.exports = contestRouter;
