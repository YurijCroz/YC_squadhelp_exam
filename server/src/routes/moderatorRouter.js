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

moderatorRouter.post(
  "/get-contestId",
  checkToken.checkToken,
  moderatorController.getContestById
);

moderatorRouter.post(
  "/update-contestId",
  checkToken.checkToken,
  moderatorController.updateContestById
);

moderatorRouter.post(
  "/get-offers",
  checkToken.checkToken,
  moderatorController.getOffers
);

moderatorRouter.post(
  "/update-offerId",
  checkToken.checkToken,
  moderatorController.updateOfferById
);

module.exports = moderatorRouter