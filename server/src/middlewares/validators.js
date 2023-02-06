"use strict";
const schemes = require("../validationSchemes/schemes");
const ServerError = require("../errors/ServerError");
const BadRequestError = require("../errors/BadRequestError");

module.exports.validateRegistrationData = async (req, res, next) => {
  const validationResult = await schemes.registrationScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for registration"));
  } else {
    next();
  }
};

module.exports.validateLogin = async (req, res, next) => {
  const validationResult = await schemes.loginScheme.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    return next(new BadRequestError("Invalid data for login"));
  }
};

module.exports.validateContestCreation = (req, res, next) => {
  const promiseArray = [];
  req.body.contests.forEach((el) => {
    promiseArray.push(schemes.contestScheme.isValid(el));
  });
  return Promise.all(promiseArray)
    .then((results) => {
      results.forEach((result) => {
        if (!result) {
          return next(new BadRequestError());
        }
      });
      next();
    })
    .catch((err) => {
      next(err);
    });
};

//****** validate for chat ******
module.exports.validateAddMessageData = async (req, res, next) => {
  const validationResult = await schemes.addMessageScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for sending a message"));
  } else {
    next();
  }
};

module.exports.validateGetChatData = async (req, res, next) => {
  const validationResult = await schemes.getChatScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for get chat"));
  } else {
    next();
  }
};

module.exports.validateBlackListData = async (req, res, next) => {
  const validationResult = await schemes.blackListScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for black list"));
  } else {
    next();
  }
};

module.exports.validateFavoriteChatData = async (req, res, next) => {
  const validationResult = await schemes.favoriteChatScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for favorite chat"));
  } else {
    next();
  }
};

module.exports.validateCreateCatalogData = async (req, res, next) => {
  const validationResult = await schemes.createCatalogScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for create catalog"));
  } else {
    next();
  }
};

module.exports.validateUpdateNameCatalogData = async (req, res, next) => {
  const validationResult = await schemes.updateNameCatalogScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for update name catalog"));
  } else {
    next();
  }
};

module.exports.validateAddNewChatToCatalogData = async (req, res, next) => {
  const validationResult = await schemes.addAndRemoveChatToCatalogScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for add new chat to catalog"));
  } else {
    next();
  }
};

module.exports.validateRemoveChatFromCatalogData = async (req, res, next) => {
  const validationResult = await schemes.addAndRemoveChatToCatalogScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for remove chat from catalog"));
  } else {
    next();
  }
};

module.exports.validateDeleteCatalogData = async (req, res, next) => {
  const validationResult = await schemes.deleteCatalogScheme.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for delete catalog"));
  } else {
    next();
  }
};
//************************/