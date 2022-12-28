const { Router } = require("express");
const basicMiddlewares = require("../middlewares/basicMiddlewares");
const moderatorController = require("../controllers/moderatorController");
const checkToken = require("../middlewares/checkToken");
const upload = require("../utils/fileUpload");

const moderatorRouter = Router()

moderatorRouter.get(
  "/get_contests",
  moderatorController.getContests
);

moderatorRouter.get(
  "/get_contestId",
  moderatorController.getContestById
);

moderatorRouter.patch(
  "/update_contestId",
  moderatorController.updateContestById
);

moderatorRouter.get(
  "/get_offers",
  moderatorController.getOffers
);

moderatorRouter.patch(
  "/update_offerId",
  moderatorController.updateOfferById
);

module.exports = moderatorRouter