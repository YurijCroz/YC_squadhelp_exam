const {
  Sequelize,
  sequelize,
  Select,
  Contest,
  Offer,
  User,
  Rating,
} = require("../models");
const ServerError = require("../errors/ServerError");
const contestQueries = require("./queries/contestQueries");
const userQueries = require("./queries/userQueries");
const controller = require("../socketInit");
const UtilFunctions = require("../utils/functions");
const CONSTANTS = require("../constants");

module.exports.getContests = async (req, res, next) => {
  try {
    if (req.tokenData.role === CONSTANTS.MODER) {
      const moderData = await Contest.findAll({
        where: { passedModeration: false },
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
    next(error);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    if (req.tokenData.role === CONSTANTS.MODER) {
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
        order: [["updatedAt", "ASC"]],
        include: {
          model: User,
          attributes: {
            exclude: ["password", "role", "balance", "accessToken"]
          }
        },
      });
      res.status(200).send( contestInfo );
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateContestById = async (req, res, next) => {
  try {
    if (req.tokenData.role === CONSTANTS.MODER) {
      const newState = await Contest.update(
        {
          passedModeration: true,
        },
        {
          where: {
            id: 16,
          },
          returning: true,
        }
      );
      res.status(200).send(newState);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getOffers = async (req, res, next) => {
  try {
    if (req.tokenData.role === CONSTANTS.MODER) {
      const moderData = await Offer.findAll({
        where: { passedModeration: false },
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
        // ! Пагинация
        // offset:((1)*3),
        // limit : 3,
        // subQuery:false
      });
      let haveMore = true;
      if (moderData.length === 0) {
        haveMore = false;
      }
      res.status(200).send({ moderData, haveMore });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateOfferById = async (req, res, next) => {
  try {
    if (req.tokenData.role === CONSTANTS.MODER) {
      const newState = await Offer.update(
        {
          passedModeration: true,
        },
        {
          where: {
            id: 22,
          },
          returning: true,
        }
      );
      res.status(200).send(newState);
    }
  } catch (error) {
    next(error);
  }
};
