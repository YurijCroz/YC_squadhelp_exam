"use strict";
const { Contest, Offer, User } = require("../models");
const CONSTANTS = require("../constants");
const utilFunctions = require("../utils/functions");
const mailerHandler = require("../utils/mailer.js");
const logger = require("../log");

const { MODER, CONTEST, OFFER } = CONSTANTS;

module.exports.getContests = async (req, res, next) => {
  try {
    if (req.tokenData.role === MODER) {
      const where = utilFunctions.whereHelper(req.body.filter);
      const moderData = await Contest.findAll({
        where: { ...where },
        attributes: ["id", "title", "updatedAt", "contestType"],
        order: [["updatedAt", "ASC"]],
        include: {
          model: User,
          attributes: ["id", "firstName", "email", "avatar"],
        },
        limit: req.body.limit,
        offset: req.body.offset,
      });
      let haveMore = true;
      if (moderData.length === 0) {
        haveMore = false;
      }
      res.status(200).send({ moderData, haveMore });
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    if (req.tokenData.role === MODER) {
      const contestInfo = await Contest.findOne({
        where: { id: req.headers.contestid },
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
            exclude: ["password", "role", "balance", "accessToken"],
          },
        },
      });
      res.status(200).send(contestInfo);
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.moderationContestById = async (req, res, next) => {
  try {
    if (req.tokenData.role === MODER) {
      const newState = await Contest.update(
        {
          passedModeration: req.body.passedModeration,
          banned: req.body.banned,
        },
        {
          where: {
            id: req.body.contestId,
          },
          returning: true,
        }
      );
      mailerHandler(CONTEST, req.body.contestId);
      res.status(200).send(newState);
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.getOffers = async (req, res, next) => {
  try {
    if (req.tokenData.role === MODER) {
      const where = utilFunctions.whereHelper(req.body.filter);
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
        include: {
          model: User,
          attributes: ["id", "firstName", "email", "lastName"],
        },
        limit: req.body.limit,
        offset: req.body.offset,
      });
      let haveMore = true;
      if (moderData.length === 0) {
        haveMore = false;
      }
      res.status(200).send({ moderData, haveMore });
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.moderationOfferById = async (req, res, next) => {
  try {
    if (req.tokenData.role === MODER) {
      const newState = await Offer.update(
        {
          passedModeration: req.body.passedModeration,
          banned: req.body.banned,
        },
        {
          where: {
            id: req.body.offerId,
          },
          returning: true,
        }
      );
      mailerHandler(OFFER, req.body.offerId);
      res.status(200).send(newState);
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
