"use strict";
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");
const TokenError = require("../errors/TokenError");
const userQueries = require("../controllers/queries/userQueries");
const { logger } = require("../log");

const { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } = CONSTANTS;

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new TokenError("need token"));
  }
  try {
    const tokenData = jwt.verify(accessToken, JWT_SECRET_ACCESS);
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
    req.tokenData = jwt.verify(accessToken, JWT_SECRET_ACCESS);
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
    req.tokenData = jwt.verify(refreshToken, JWT_SECRET_REFRESH);
    next();
  } catch (error) {
    logger.error(error);
    next(new TokenError());
  }
};
