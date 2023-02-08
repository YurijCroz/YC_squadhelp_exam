"use strict";
const CONSTANTS = require("../constants");
const ServerError = require("../errors/ServerError");
const bcrypt = require("bcrypt");
const logger = require("../log");

module.exports = async (req, res, next) => {
  try {
    req.hashPass = await bcrypt.hash(req.body.password, CONSTANTS.SALT_ROUNDS);
    next();
  } catch (error) {
    logger.error(error);
    next(new ServerError("Server Error on hash password"));
  }
};
