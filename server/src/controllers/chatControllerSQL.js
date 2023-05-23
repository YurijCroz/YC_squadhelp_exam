"use strict";
const {
  Message,
  Catalog,
  Conversation,
  ConversationToCatalog,
  sequelize,
} = require("../models");
const chatQueries = require("./queries/chatQueries.js");
const controller = require("../socketInit");
const _ = require("lodash");
const { logger } = require("../log");

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await chatQueries.findLastMsgAndDetails(
      req.tokenData.userId
    );
    const preview = conversations.map(
      ({
        userFirst,
        userSecond,
        participant0,
        participant1,
        messages: [message],
        ...other
      }) => ({
        ...message,
        ...other,
        participants: [participant0, participant1],
        interlocutor:
          userFirst.id === req.tokenData.userId ? userSecond : userFirst,
      })
    );
    res.status(200).send(preview);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.addMessage = async (req, res, next) => {
  const [firstUser, secondUser] =
    req.tokenData.userId <= req.body.recipient
      ? [req.tokenData.userId, req.body.recipient]
      : [req.body.recipient, req.tokenData.userId];
  try {
    const [conversation] = await Conversation.findOrCreate({
      where: {
        participant0: firstUser,
        participant1: secondUser,
      },
      defaults: {
        blackList: [false, false],
        favoriteList: [false, false],
      },
      attributes: [
        "id",
        "blackList",
        "favoriteList",
        "participant0",
        "participant1",
      ],
    });
    const conversationId = conversation.dataValues.id;
    const message = await Message.create(
      {
        sender: req.tokenData.userId,
        body: req.body.messageBody.trim(),
        conversation: conversationId,
      },
      {
        returning: true,
        plain: true,
      }
    );
    message.dataValues.participants = [firstUser, secondUser];
    const preview = {
      id: conversation.dataValues.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.dataValues.createdAt,
      participants: [firstUser, secondUser],
      blackList: conversation.dataValues.blackList,
      favoriteList: conversation.dataValues.favoriteList,
    };
    controller.getChatController().emitNewMessage(req.body.recipient, {
      message,
      preview: {
        ...preview,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    res.status(201).send({
      message,
      preview: { ...preview, interlocutor: req.body.interlocutor },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const userDataAndChat = await chatQueries.findInterlocutorAndMessages(
      req.body.interlocutorId,
      req.tokenData.userId
    );
    const formatChatResponse = ({ Conversations, ...other }) => ({
      messages: Conversations[0]?.messages || [],
      interlocutor: other,
    });
    res.status(200).send(formatChatResponse(userDataAndChat));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.blackList = async (req, res, next) => {
  const participants = req.body.participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  const index = participants.indexOf(req.tokenData.userId);
  if (index < 0) return;
  const columnName = "blackList";
  try {
    const chat = await chatQueries.updateColumnArray(
      columnName,
      index,
      req.body.blackListFlag,
      req.body.participants[0],
      req.body.participants[1]
    );
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
    res.status(200).send(chat);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const participants = req.body.participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  const index = participants.indexOf(req.tokenData.userId);
  if (index < 0) return;
  const columnName = "favoriteList";
  try {
    const state = await chatQueries.updateColumnArray(
      columnName,
      index,
      req.body.favoriteFlag,
      req.body.participants[0],
      req.body.participants[1]
    );
    res.status(200).send(state);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const newCatalog = await Catalog.create(
      {
        userId: req.tokenData.userId,
        catalogName: req.body.catalogName.trim(),
      },
      { returning: ["id"] }
    );
    await ConversationToCatalog.create({
      catalogId: newCatalog.dataValues.id,
      conversationId: req.body.chatId,
    });
    const catalog = await chatQueries.getCatalog(
      newCatalog.dataValues.id,
      req.tokenData.userId
    );
    res.status(201).send(catalog);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    await Catalog.update(
      { catalogName: req.body.catalogName.trim() },
      {
        where: {
          id: req.body.catalogId,
          userId: req.tokenData.userId,
        },
      }
    );
    const catalog = await chatQueries.getCatalog(
      req.body.catalogId,
      req.tokenData.userId
    );
    res.status(200).send(catalog);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    //seek and create
    const resultCatalog = await chatQueries.userAuthenticationForCatalog({
      id: req.body.catalogId,
      userId: req.tokenData.userId,
    });
    const resultChat = await chatQueries.userAuthenticationForChat(
      req.body.chatId,
      req.tokenData.userId
    );
    if (resultCatalog && resultChat) {
      await ConversationToCatalog.create({
        catalogId: req.body.catalogId,
        conversationId: req.body.chatId,
      });
    }
    const catalog = await chatQueries.getCatalog(
      req.body.catalogId,
      req.tokenData.userId
    );
    res.status(201).send(catalog);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    //seek and destroy
    const result = await chatQueries.userAuthenticationForCatalog({
      id: req.body.catalogId,
      userId: req.tokenData.userId,
    });
    if (result) {
      await ConversationToCatalog.destroy({
        where: {
          catalogId: req.body.catalogId,
          conversationId: req.body.chatId,
        },
      });
    }
    const catalog = await chatQueries.getCatalog(
      req.body.catalogId,
      req.tokenData.userId
    );
    res.status(200).send(catalog);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    //seek and destroy
    const result = await chatQueries.userAuthenticationForCatalog({
      id: req.body.catalogId,
      userId: req.tokenData.userId,
    });
    if (result) {
      await ConversationToCatalog.destroy(
        {
          where: { catalogId: req.body.catalogId },
        },
        { transaction: transaction }
      );
      await Catalog.destroy(
        {
          where: {
            id: req.body.catalogId,
            userId: req.tokenData.userId,
          },
        },
        { transaction: transaction }
      );
    }
    await transaction.commit();
    res.status(204).end();
  } catch (error) {
    await transaction.rollback();
    logger.error(error);
    next(error);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalog.findAll({
      where: { userId: req.tokenData.userId },
      attributes: ["id", "catalogName"],
      include: {
        model: Conversation,
        attributes: ["id"],
      },
    });
    catalogs.forEach((catalog) => {
      catalog.dataValues.chats = catalog.dataValues.Conversations.map(
        (el) => el.id
      );
      delete catalog.dataValues.Conversations;
    });
    res.status(200).send(catalogs);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
