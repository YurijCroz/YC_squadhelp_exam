"use strict";
const { Router } = require("express");
const chatController = require("../controllers/chatControllerSQL");
const validators = require("../middleware/validators");

const chatRouterSQL = Router();

chatRouterSQL.get("/getPreview", chatController.getPreview);

chatRouterSQL.post(
  "/newMessage",
  validators.validateAddMessageData,
  chatController.addMessage
);

chatRouterSQL.get(
  "/getChat/:interlocutorId",
  validators.validateGetChatData,
  chatController.getChat
);

chatRouterSQL.patch(
  "/blackList",
  validators.validateBlackListData,
  chatController.blackList
);

chatRouterSQL.patch(
  "/favorite",
  validators.validateFavoriteChatData,
  chatController.favoriteChat
);

chatRouterSQL.post(
  "/createCatalog",
  validators.validateCreateCatalogData,
  chatController.createCatalog
);

chatRouterSQL.patch(
  "/updateNameCatalog/:catalogId",
  validators.validateUpdateNameCatalogData,
  chatController.updateNameCatalog
);

chatRouterSQL.post(
  "/addNewChatToCatalog",
  validators.validateAddNewChatToCatalogData,
  chatController.addNewChatToCatalog
);

chatRouterSQL.delete(
  "/removeChatFromCatalog",
  validators.validateRemoveChatFromCatalogData,
  chatController.removeChatFromCatalog
);

chatRouterSQL.delete(
  "/deleteCatalog/:catalogId",
  validators.validateDeleteCatalogData,
  chatController.deleteCatalog
);

chatRouterSQL.get("/getCatalogs", chatController.getCatalogs);

module.exports = chatRouterSQL;
