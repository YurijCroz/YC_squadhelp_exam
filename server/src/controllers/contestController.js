"use strict";
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
const { logger } = require("../log");

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const {
      query: { characteristic1, characteristic2 },
    } = req;
    const types = [characteristic1, characteristic2, "industry"].filter(
      Boolean
    );

    const characteristics = await Select.findAll({
      where: {
        type: {
          [Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (error) {
    logger.error(error);
    next(new ServerError("cannot get contest preferences"));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await Contest.findOne({
      where: { id: req.params.contestId },
      order: [[Offer, "id", "asc"]],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ["password", "role", "balance", "accessToken"],
          },
        },
        {
          model: Offer,
          required: false,
          where:
            req.tokenData.role === CONSTANTS.CREATOR
              ? { userId: req.tokenData.userId }
              : { passedModeration: true, banned: false },
          attributes: { exclude: ["userId", "contestId"] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ["password", "role", "balance", "accessToken"],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ["userId", "offerId"] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (error) {
    logger.error(error);
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.params.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  try {
    const obj = {
      userId: req.tokenData.userId,
      contestId: req.body.contestId,
    };
    if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
      obj.fileName = req.file.filename;
      obj.originalFileName = req.file.originalname;
    } else {
      obj.text = req.body.offerData;
    }
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (error) {
    logger.error(error);
    next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      "Someone of yours offers was rejected",
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST_STATUS_ACTIVE
      }'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
    },
    { orderId },
    transaction
  );
  await userQueries.updateUser(
    { balance: sequelize.literal("balance + " + finishedContest.prize) },
    creatorId,
    transaction
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction
  );
  transaction.commit();
  const arrayRoomsId = [];
  const winningOffer = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
    if (offer.status === CONSTANTS.OFFER_STATUS_WON) {
      winningOffer.push(offer);
    }
  });
  if (arrayRoomsId.length > 0) {
    controller
      .getNotificationController()
      .emitChangeOfferStatus(
        [...new Set(arrayRoomsId)],
        "Someone of yours offers was rejected",
        contestId
      );
  }
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, "Someone of your offers WIN", contestId);
  return winningOffer[0];
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === "reject") {
    try {
      const offer = await rejectOffer(
        req.params.offerId,
        req.body.creatorId,
        req.body.contestId
      );
      res.send(offer);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  } else if (req.body.command === "resolve") {
    try {
      transaction = await sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.params.offerId,
        req.body.priority,
        transaction
      );
      res.send(winningOffer);
    } catch (error) {
      transaction.rollback();
      logger.error(error);
      next(error);
    }
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try {
    const contests = await Contest.findAll({
      where: {
        status: req.query.contestStatus || CONSTANTS.CONTEST_STATUS_ACTIVE,
        userId: req.tokenData.userId,
      },
      limit: req.query.limit || 8,
      offset: req.query.offset || 0,
      order: [["id", "DESC"]],
      include: [
        {
          model: Offer,
          required: false,
          attributes: ["id"],
          where: {
            passedModeration: true,
            banned: false,
          },
        },
      ],
    });
    contests.forEach((contest) => {
      contest.dataValues.count = contest.dataValues.Offers.length;
      delete contest.dataValues.Offers;
    });
    const haveMore = contests.length > 0;
    res.send({ contests, haveMore });
  } catch (error) {
    logger.error(error);
    next(new ServerError(error));
  }
};

module.exports.getContests = async (req, res, next) => {
  try {
    const predicates = UtilFunctions.createWhereForAllContests(
      req.query.typeIndex,
      req.query.contestId,
      req.query.industry,
      req.query.awardSort
    );
    const ownEntries = JSON.parse(req.query.ownEntries) || false;
    const contests = await Contest.findAll({
      where: {
        ...predicates.where,
        // status: "active",
        passedModeration: true,
        banned: false,
      },
      order: predicates.order,
      limit: req.query.limit || 8,
      offset: req.query.offset || 0,
      include: [
        {
          model: Offer,
          required: ownEntries,
          where: ownEntries
            ? {
                userId: req.tokenData.userId,
              }
            : {
                passedModeration: true,
                banned: false,
              },
          attributes: ["id"],
        },
      ],
    });
    contests.forEach((contest) => {
      contest.dataValues.count = contest.dataValues.Offers.length;
      delete contest.dataValues.Offers;
    });
    const haveMore = contests.length > 0;
    res.send({ contests, haveMore });
  } catch (error) {
    logger.error(error);
    next(new ServerError(error));
  }
};
