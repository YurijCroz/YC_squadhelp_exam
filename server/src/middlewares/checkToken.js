"use strict";
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");
const TokenError = require("../errors/TokenError");
const userQueries = require("../controllers/queries/userQueries");
const { logger } = require("../log");

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new TokenError("need token"));
  }
  try {
    const tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    });
  } catch (error) {
    logger.error(error);
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new TokenError("need token"));
  }
  try {
    req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    next();
  } catch (error) {
    logger.error(error);
    next(new TokenError());
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  const refreshToken = req.headers.authorization;
  if (!refreshToken) {
    return next(new TokenError("need token"));
  }
  try {
    req.tokenData = jwt.verify(refreshToken, CONSTANTS.JWT_SECRET);
    next();
  } catch (error) {
    logger.error(error);
    next(new TokenError());
  }
};
