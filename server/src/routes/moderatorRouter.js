"use strict";
const { Router } = require("express");
const basicMiddleware = require("../middleware/basicMiddleware");
const moderatorController = require("../controllers/moderatorController");
const checkToken = require("../middleware/checkToken");

const moderatorRouter = Router();

moderatorRouter.get(
  "/get-contests",
  checkToken.checkToken,
  basicMiddleware.onlyForModerator,
  moderatorController.getContests
);

moderatorRouter.get(
  "/getContestByIdForModerator/:contestId",
  checkToken.checkToken,
  basicMiddleware.onlyForModerator,
  moderatorController.getContestById
);

moderatorRouter.patch(
  "/moderation-contestId/:contestId",
  checkToken.checkToken,
  basicMiddleware.onlyForModerator,
  moderatorController.moderationContestById
);

moderatorRouter.get(
  "/get-offers",
  checkToken.checkToken,
  basicMiddleware.onlyForModerator,
  moderatorController.getOffers
);

moderatorRouter.patch(
  "/moderation-offerId/:offerId",
  checkToken.checkToken,
  basicMiddleware.onlyForModerator,
  moderatorController.moderationOfferById
);

module.exports = moderatorRouter;
