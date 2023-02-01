"use strict";
const { Router } = require("express");
const checkToken = require("../middlewares/checkToken");
const chatController = require("../controllers/chatControllerSQL");

const chatRouterSQL = Router();

chatRouterSQL.post(
  "/getPreview",
  checkToken.checkToken,
  chatController.getPreview
);

chatRouterSQL.post(
  "/newMessage",
  checkToken.checkToken,
  chatController.addMessage
);

chatRouterSQL.post(
  "/getChat",
  checkToken.checkToken,
  chatController.getChat
);

chatRouterSQL.post(
  "/blackList",
  checkToken.checkToken,
  chatController.blackList
);

chatRouterSQL.post(
  "/favorite",
  checkToken.checkToken,
  chatController.favoriteChat
);

chatRouterSQL.post(
  "/createCatalog",
  checkToken.checkToken,
  chatController.createCatalog
);

chatRouterSQL.post(
  "/updateNameCatalog",
  checkToken.checkToken,
  chatController.updateNameCatalog
);

chatRouterSQL.post(
  "/addNewChatToCatalog",
  checkToken.checkToken,
  chatController.addNewChatToCatalog
);

chatRouterSQL.post(
  "/removeChatFromCatalog",
  checkToken.checkToken,
  chatController.removeChatFromCatalog
);

chatRouterSQL.post(
  "/deleteCatalog",
  checkToken.checkToken,
  chatController.deleteCatalog
);

chatRouterSQL.post(
  "/getCatalogs",
  checkToken.checkToken,
  chatController.getCatalogs
);

module.exports = chatRouterSQL;