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
    const contest = await Contest.findAll({
      where: { passedModeration: false },
      attributes: ["id", "title", "updatedAt"],
      order: [["updatedAt", "ASC"]],
      include: {
        model: User,
        attributes: ["id", "firstName", "email", "avatar"],
      },
    });
    res.status(200).send({ data: contest });
  } catch (error) {
    next(error);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const contest = await Contest.findOne({
      where: { id: 22 },
      attributes: {
        exclude: [
          "orderId",
          "userId",
          "createdAt",
          "status",
          "prize",
          "priority",
        ],
      },
      order: [["updatedAt", "ASC"]],
      include: {
        model: User,
        attributes: [
          "id",
          "firstName",
          "lastName",
          "displayName",
          "email",
          "avatar",
        ],
      },
    });
    res.status(200).send({ data: contest });
  } catch (error) {
    next(error);
  }
};

module.exports.updateContestById = async (req, res, next) => {
  try {
    const newState = await Contest.update({
      passedModeration: true
    },{
      where: {
        id: 22
      },
      returning: true,
    })
    res.status(200).send(newState)
  } catch (error) {
    next(error);
  }
}

module.exports.getOffers = async (req, res, next) => {
  try {
    const offer = await Offer.findAll({
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
        attributes: ["id", "firstName", "email", "avatar", "rating"],
      },
      // ! Пагинация
      // offset:((1)*3),
      // limit : 3,
      // subQuery:false
    });
    res.status(200).send({ data: offer });
  } catch (error) {
    next(error);
  }
};

module.exports.updateOfferById = async (req, res, next) => {
  try {
    const newState = await Offer.update({
      passedModeration: true
    },{
      where: {
        id: 22
      },
      returning: true,
    })
    res.status(200).send(newState)
  } catch (error) {
    next(error);
  }
}