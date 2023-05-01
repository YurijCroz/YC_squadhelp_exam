"use strict";
const { Contest, Offer, User } = require("../models");
const CONSTANTS = require("../constants");
const utilFunctions = require("../utils/functions");
const mailerHandler = require("../utils/mailer.js");
const { logger } = require("../log");
const controller = require("../socketInit");

const { CONTEST, OFFER } = CONSTANTS;

module.exports.getContests = async (req, res, next) => {
  try {
    const where = utilFunctions.whereHelper(req.query.filter);
    const moderData = await Contest.findAll({
      where: { ...where },
      attributes: ["id", "title", "updatedAt", "contestType"],
      order: [["updatedAt", "ASC"]],
      include: {
        model: User,
        attributes: ["id", "firstName", "email", "avatar"],
      },
      limit: req.query.limit,
      offset: req.query.offset,
    });
    let haveMore = true;
    if (moderData.length === 0) {
      haveMore = false;
    }
    res.status(200).send({ moderData, haveMore });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const contestInfo = await Contest.findOne({
      where: { id: req.params.contestId },
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
    const newState = await Contest.update(
      {
        passedModeration: true,
        banned: req.body.banned,
      },
      {
        where: {
          id: req.params.contestId,
        },
        returning: true,
      }
    );
    mailerHandler(CONTEST, req.params.contestId);
    res.status(200).send(newState);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.getOffers = async (req, res, next) => {
  try {
    const where = utilFunctions.whereHelper(req.query.filter);
    const moderData = await Offer.findAll({
      where: { ...where },
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
    let haveMore = true;
    if (moderData.length === 0) {
      haveMore = false;
    }
    res.status(200).send({ moderData, haveMore });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.moderationOfferById = async (req, res, next) => {
  try {
    const newState = await Offer.update(
      {
        passedModeration: true,
        banned: req.body.banned,
      },
      {
        where: {
          id: req.params.offerId,
        },
        returning: true,
      }
    );
    if (!req.body.banned) {
      controller
        .getNotificationController()
        .emitEntryCreated(req.body.customerUserId);
    }
    mailerHandler(OFFER, req.params.offerId);
    res.status(200).send(newState);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
