"use strict";
const CONSTANTS = require("../constants");
const NotUniqueEmail = require("../errors/NotUniqueEmail");
const getJwtToken = require("../utils/getJwtToken");
const userQueries = require("./queries/userQueries");
const { logger } = require("../log");

const {
  JWT_SECRET_ACCESS,
  JWT_SECRET_REFRESH,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
} = CONSTANTS;

module.exports.login = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ email: req.body.email });
    await userQueries.passwordCompare(req.body.password, foundUser.password);
    const accessToken = getJwtToken(
      foundUser,
      JWT_SECRET_ACCESS,
      ACCESS_TOKEN_TIME
    );
    const refreshToken = getJwtToken(
      foundUser,
      JWT_SECRET_REFRESH,
      REFRESH_TOKEN_TIME
    );
    await userQueries.updateUser({ refreshToken }, foundUser.id);
    res.send({
      tokensPair: { accessToken, refreshToken },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await userQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass })
    );
    const accessToken = getJwtToken(
      newUser,
      JWT_SECRET_ACCESS,
      ACCESS_TOKEN_TIME
    );
    const refreshToken = getJwtToken(
      newUser,
      JWT_SECRET_REFRESH,
      REFRESH_TOKEN_TIME
    );
    await userQueries.updateUser({ refreshToken }, newUser.id);
    res.send({
      tokensPair: { accessToken, refreshToken },
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      next(new NotUniqueEmail());
    } else {
      logger.error(err);
      next(err);
    }
  }
};

module.exports.refreshToken = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ id: req.tokenData.userId });
    if (foundUser.refreshToken === req.headers.authorization) {
      const accessToken = getJwtToken(
        foundUser,
        JWT_SECRET_ACCESS,
        ACCESS_TOKEN_TIME
      );
      const refreshToken = getJwtToken(
        foundUser,
        JWT_SECRET_REFRESH,
        REFRESH_TOKEN_TIME
      );
      await userQueries.updateUser({ refreshToken }, foundUser.id);
      res.send({
        tokensPair: { accessToken, refreshToken },
      });
    } else {
      res.status(403).end();
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
