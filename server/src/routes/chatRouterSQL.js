"use strict";
const { Router } = require("express");
const checkToken = require("../middlewares/checkToken");
const chatController = require("../controllers/chatControllerSQL");
const validators = require("../middlewares/validators");

const chatRouterSQL = Router();

chatRouterSQL.post(
  "/getPreview",
  checkToken.checkToken,
  chatController.getPreview
);

chatRouterSQL.post(
  "/newMessage",
  checkToken.checkToken,
  validators.validateAddMessageData,
  chatController.addMessage
);

chatRouterSQL.post(
  "/getChat",
  checkToken.checkToken,
  validators.validateGetChatData,
  chatController.getChat
);

chatRouterSQL.post(
  "/blackList",
  checkToken.checkToken,
  validators.validateBlackListData,
  chatController.blackList
);

chatRouterSQL.post(
  "/favorite",
  checkToken.checkToken,
  validators.validateFavoriteChatData,
  chatController.favoriteChat
);

chatRouterSQL.post(
  "/createCatalog",
  checkToken.checkToken,
  validators.validateCreateCatalogData,
  chatController.createCatalog
);

chatRouterSQL.post(
  "/updateNameCatalog",
  checkToken.checkToken,
  validators.validateUpdateNameCatalogData,
  chatController.updateNameCatalog
);

chatRouterSQL.post(
  "/addNewChatToCatalog",
  checkToken.checkToken,
  validators.validateAddNewChatToCatalogData,
  chatController.addNewChatToCatalog
);

chatRouterSQL.post(
  "/removeChatFromCatalog",
  checkToken.checkToken,
  validators.validateRemoveChatFromCatalogData,
  chatController.removeChatFromCatalog
);

chatRouterSQL.post(
  "/deleteCatalog",
  checkToken.checkToken,
  validators.validateDeleteCatalogData,
  chatController.deleteCatalog
);

chatRouterSQL.post(
  "/getCatalogs",
  checkToken.checkToken,
  chatController.getCatalogs
);

module.exports = chatRouterSQL;