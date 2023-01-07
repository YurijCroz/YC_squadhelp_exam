const { Router } = require("express");
const basicMiddlewares = require("../middlewares/basicMiddlewares");
const moderatorController = require("../controllers/moderatorController");
const checkToken = require("../middlewares/checkToken");
const upload = require("../utils/fileUpload");

const moderatorRouter = Router()

moderatorRouter.post(
  "/get-contests",
  checkToken.checkToken,
  moderatorController.getContests
);

moderatorRouter.get(
  "/getContestByIdForModerator",
  checkToken.checkToken,
  moderatorController.getContestById
);

moderatorRouter.post(
  "/moderation-contestId",
  checkToken.checkToken,
  moderatorController.moderationContestById
);

moderatorRouter.post(
  "/get-offers",
  checkToken.checkToken,
  moderatorController.getOffers
);

moderatorRouter.post(
  "/update-offerId",
  checkToken.checkToken,
  moderatorController.moderationOfferById
);

module.exports = moderatorRouter