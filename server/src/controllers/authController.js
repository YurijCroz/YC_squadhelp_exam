"use strict";
const CONSTANTS = require("../constants");
const NotUniqueEmail = require("../errors/NotUniqueEmail");
const utilFunctions = require("../utils/functions");
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
    const accessToken = utilFunctions.getJwtToken(
      foundUser,
      JWT_SECRET_ACCESS,
      ACCESS_TOKEN_TIME
    );
    const refreshToken = utilFunctions.getJwtToken(
      foundUser,
      JWT_SECRET_REFRESH,
      REFRESH_TOKEN_TIME
    );
    await userQueries.updateUser({ accessToken }, foundUser.id);
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
    const accessToken = utilFunctions.getJwtToken(
      newUser,
      JWT_SECRET_ACCESS,
      ACCESS_TOKEN_TIME
    );
    const refreshToken = utilFunctions.getJwtToken(
      newUser,
      JWT_SECRET_REFRESH,
      REFRESH_TOKEN_TIME
    );
    await userQueries.updateUser({ accessToken }, newUser.id);
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
    const accessToken = utilFunctions.getJwtToken(
      foundUser,
      JWT_SECRET_ACCESS,
      ACCESS_TOKEN_TIME
    );
    const refreshToken = utilFunctions.getJwtToken(
      foundUser,
      JWT_SECRET_REFRESH,
      REFRESH_TOKEN_TIME
    );
    await userQueries.updateUser({ accessToken }, foundUser.id);
    res.send({
      tokensPair: { accessToken, refreshToken },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};