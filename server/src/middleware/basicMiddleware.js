"use strict";
const { Sequelize, Contest } = require("../models");
const NotFound = require("../errors/UserNotFoundError");
const RightsError = require("../errors/RightsError");
const ServerError = require("../errors/ServerError");
const CONSTANTS = require("../constants");
const { logger } = require("../log");

module.exports.parseBody = (req, res, next) => {
  req.body.contests = JSON.parse(req.body.contests);
  for (let i = 0; i < req.body.contests.length; i++) {
    if (req.body.contests[i].haveFile) {
      const file = req.files.splice(0, 1);
      req.body.contests[i].fileName = file[0].filename;
      req.body.contests[i].originalFileName = file[0].originalname;
    }
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  try {
    if (req.tokenData.role === CONSTANTS.CUSTOMER) {
      result = await Contest.findOne({
        where: { id: req.params.contestId, userId: req.tokenData.userId },
      });
    } else if (req.tokenData.role === CONSTANTS.CREATOR) {
      result = await Contest.findOne({
        where: {
          id: req.params.contestId,
          status: {
            [Sequelize.Op.or]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (error) {
    logger.error(error);
    next(new ServerError(error));
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  try {
    const result = await Contest.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ["status"],
    });
    if (
      result.get({ plain: true }).status === CONSTANTS.CONTEST_STATUS_ACTIVE
    ) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (error) {
    logger.error(error);
    next(new ServerError(error));
  }
};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (error) {
    logger.error(error);
    next(new ServerError(error));
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: { [Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (error) {
    logger.error(error);
    next(new ServerError(error));
  }
};
