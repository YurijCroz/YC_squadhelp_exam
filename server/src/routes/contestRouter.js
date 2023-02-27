"use strict";
const { Router } = require("express");
const basicMiddleware = require("../middleware/basicMiddleware");
const contestController = require("../controllers/contestController");
const checkToken = require("../middleware/checkToken");
const upload = require("../utils/fileUpload");

const contestRouter = Router();

contestRouter.post(
  "/dataForContest",
  contestController.dataForContest
);

contestRouter.post(
  "/getCustomersContests",
  checkToken.checkToken,
  contestController.getCustomersContests
);

contestRouter.get(
  "/getContestById",
  checkToken.checkToken,
  basicMiddleware.canGetContest,
  contestController.getContestById
);

contestRouter.post(
  "/getAllContests",
  checkToken.checkToken,
  basicMiddleware.onlyForCreative,
  contestController.getContests
);

contestRouter.post(
  "/updateContest",
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest
);

module.exports = contestRouter;
