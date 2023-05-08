"use strict";
const { Router } = require("express");
const {
  getContests,
  getContestById,
  moderationContestById,
  getOffers,
  moderationOfferById,
} = require("../controllers/moderatorController");

const moderatorRouter = Router();

moderatorRouter.get("/get-contests", getContests);

moderatorRouter.get("/getContestByIdForModerator/:contestId", getContestById);

moderatorRouter.patch(
  "/moderation-contestId/:contestId",
  moderationContestById
);

moderatorRouter.get("/get-offers", getOffers);

moderatorRouter.patch("/moderation-offerId/:offerId", moderationOfferById);

module.exports = moderatorRouter;
