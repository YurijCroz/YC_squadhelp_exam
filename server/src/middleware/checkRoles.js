"use strict";
const RightsError = require("../errors/RightsError");
const CONSTANTS = require("../constants");

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CREATOR) {
    next();
  } else {
    next(new RightsError("this page only for creative"));
  }
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    next();
  } else {
    return next(new RightsError("this page only for customer"));
  }
};

module.exports.onlyForCustomerOrCreative = (req, res, next) => {
  if (
    req.tokenData.role === CONSTANTS.CUSTOMER ||
    req.tokenData.role === CONSTANTS.CREATOR
  ) {
    next();
  } else {
    return next(new RightsError("this page only for customer or creative"));
  }
};

module.exports.onlyForModerator = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.MODER) {
    next();
  } else {
    return next(new RightsError("this page only for moderator"));
  }
};