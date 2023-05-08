"use strict";
const { Router } = require("express");
const chatController = require("../controllers/chatControllerSQL");
const validators = require("../middleware/validators");

const chatRouterSQL = Router();

chatRouterSQL.post("/getPreview", chatController.getPreview);

chatRouterSQL.post(
  "/newMessage",
  validators.validateAddMessageData,
  chatController.addMessage
);

chatRouterSQL.post(
  "/getChat",
  validators.validateGetChatData,
  chatController.getChat
);

chatRouterSQL.post(
  "/blackList",
  validators.validateBlackListData,
  chatController.blackList
);

chatRouterSQL.post(
  "/favorite",
  validators.validateFavoriteChatData,
  chatController.favoriteChat
);

chatRouterSQL.post(
  "/createCatalog",
  validators.validateCreateCatalogData,
  chatController.createCatalog
);

chatRouterSQL.post(
  "/updateNameCatalog",
  validators.validateUpdateNameCatalogData,
  chatController.updateNameCatalog
);

chatRouterSQL.post(
  "/addNewChatToCatalog",
  validators.validateAddNewChatToCatalogData,
  chatController.addNewChatToCatalog
);

chatRouterSQL.post(
  "/removeChatFromCatalog",
  validators.validateRemoveChatFromCatalogData,
  chatController.removeChatFromCatalog
);

chatRouterSQL.post(
  "/deleteCatalog",
  validators.validateDeleteCatalogData,
  chatController.deleteCatalog
);

chatRouterSQL.post("/getCatalogs", chatController.getCatalogs);

module.exports = chatRouterSQL;
