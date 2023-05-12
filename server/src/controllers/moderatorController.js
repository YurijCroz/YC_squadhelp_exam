"use strict";
const { Contest, Offer, User } = require("../models");
const { Op } = require("sequelize");
const CONSTANTS = require("../constants");
const { createWhereForModerator } = require("../utils/whereHelpers");
const mailerHandler = require("../utils/mailer.js");
const { logger } = require("../log");
const controller = require("../socketInit");

const { CONTEST, OFFER, OFFER_STATUS_PENDING, CONTEST_STATUS_FINISHED } =
  CONSTANTS;

module.exports.getContests = async (req, res, next) => {
  try {
    const where = createWhereForModerator(req.query.filter);
    const moderData = await Contest.findAll({
      where: { ...where, status: { [Op.not]: CONTEST_STATUS_FINISHED } },
      attributes: ["id", "title", "updatedAt", "contestType"],
      order: [["updatedAt", "ASC"]],
      include: {
        model: User,
        attributes: ["id", "firstName", "email", "avatar"],
      },
      limit: req.query.limit,
      offset: req.query.offset,
    });
    const haveMore = moderData.length > 0;
    res.status(200).send({ moderData, haveMore });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const contestInfo = await Contest.findOne({
      where: {
        id: req.params.contestId,
        status: { [Op.not]: CONTEST_STATUS_FINISHED },
      },
      attributes: {
        exclude: [
          "orderId",
          "userId",
          "createdAt",
          "updatedAt",
          "status",
          "priority",
        ],
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password", "role", "balance", "refreshToken"],
        },
      },
    });
    res.status(200).send(contestInfo);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.moderationContestById = async (req, res, next) => {
  try {
    const [updatedCount] = await Contest.update(
      {
        passedModeration: true,
        banned: req.body.banned,
      },
      {
        where: {
          id: req.params.contestId,
          status: { [Op.not]: CONTEST_STATUS_FINISHED },
        },
      }
    );
    if (updatedCount === 0) {
      return res.status(404).send("No contest was updated.");
    }
    mailerHandler(CONTEST, req.params.contestId);
    res.status(200).send("Success");
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.getOffers = async (req, res, next) => {
  try {
    const where = createWhereForModerator(req.query.filter);
    const moderData = await Offer.findAll({
      where: { ...where, status: OFFER_STATUS_PENDING },
      attributes: [
        "id",
        "text",
        "fileName",
        "passedModeration",
        "banned",
        "createdAt",
      ],
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "email", "lastName"],
        },
        {
          model: Contest,
          attributes: ["userId"],
        },
      ],
      nest: true,
      raw: true,
      limit: req.query.limit,
      offset: req.query.offset,
    });
    const haveMore = moderData.length > 0;
    res.status(200).send({ moderData, haveMore });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.moderationOfferById = async (req, res, next) => {
  try {
    const [updatedCount] = await Offer.update(
      {
        passedModeration: true,
        banned: req.body.banned,
      },
      {
        where: {
          id: req.params.offerId,
          status: OFFER_STATUS_PENDING,
        },
      }
    );
    if (updatedCount === 0) {
      return res.status(404).send("No offer was updated.");
    }
    if (!req.body.banned) {
      controller
        .getNotificationController()
        .emitEntryCreated(req.body.customerUserId);
    }
    mailerHandler(OFFER, req.params.offerId);
    res.status(200).send("Success");
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
