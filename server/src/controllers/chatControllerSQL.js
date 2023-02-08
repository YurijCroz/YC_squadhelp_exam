"use strict";
const {
  User,
  Message,
  Catalog,
  Conversation,
  ConversationToCatalog,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const chatQueries = require("./queries/chatQueries.js");
const userQueries = require("./queries/userQueries");
const controller = require("../socketInit");
const _ = require("lodash");
const logger = require("../log");

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { participant0: req.tokenData.userId },
          { participant1: req.tokenData.userId },
        ],
      },
      attributes: [
        "id",
        "blackList",
        "favoriteList",
        "participant0",
        "participant1",
      ],
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          as: "userFirst",
          attributes: ["id", "firstName", "lastName", "displayName", "avatar"],
        },
        {
          model: User,
          as: "userSecond",
          attributes: ["id", "firstName", "lastName", "displayName", "avatar"],
        },
        {
          model: Message,
          as: "messages",
          attributes: ["sender", ["body", "text"], "createdAt"],
          order: [["createdAt", "DESC"]],
          limit: 1,
        },
      ],
    });
    conversations.forEach((chat) => {
      chat.dataValues.participants = [
        chat.dataValues.participant0,
        chat.dataValues.participant1,
      ];
      chat.dataValues.participant0 === req.tokenData.userId
        ? (chat.dataValues.interlocutor = chat.dataValues.userSecond)
        : (chat.dataValues.interlocutor = chat.dataValues.userFirst);
      const message = chat.dataValues.messages.map((el) => el.dataValues);
      delete chat.dataValues.messages;
      delete chat.dataValues.userFirst;
      delete chat.dataValues.userSecond;
      delete chat.dataValues.participant0;
      delete chat.dataValues.participant1;
      chat.dataValues = { ...message["0"], ...chat.dataValues };
    });
    res.status(200).send(conversations);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.addMessage = async (req, res, next) => {
  const firstUser =
    req.tokenData.userId <= req.body.recipient
      ? req.tokenData.userId
      : req.body.recipient;
  const secondUser =
    req.body.recipient >= req.tokenData.userId
      ? req.body.recipient
      : req.tokenData.userId;
  try {
    const conversation = await Conversation.findOrCreate({
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
    const conversationId = conversation[0].dataValues.id;
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
      id: conversation[0].dataValues.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.dataValues.createdAt,
      participants: [firstUser, secondUser],
      blackList: conversation[0].dataValues.blackList,
      favoriteList: conversation[0].dataValues.favoriteList,
    };
    controller.getChatController().emitNewMessage(req.body.interlocutor, {
      message,
      preview: {
        id: conversation[0].dataValues.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.dataValues.createdAt,
        participants: [firstUser, secondUser],
        blackList: conversation[0].dataValues.blackList,
        favoriteList: conversation[0].dataValues.favoriteList,
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
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports.getChat = async (req, res, next) => {
  const firstUser =
    req.tokenData.userId <= req.body.interlocutorId
      ? req.tokenData.userId
      : req.body.interlocutorId;
  const secondUser =
    req.body.interlocutorId >= req.tokenData.userId
      ? req.body.interlocutorId
      : req.tokenData.userId;
  try {
    const conversation = await Conversation.findOne({
      where: {
        participant0: firstUser,
        participant1: secondUser,
      },
      attributes: ["participant0", "participant1"],
      include: [
        {
          model: Message,
          as: "messages",
          attributes: [
            "id",
            "sender",
            "body",
            "conversation",
            "createdAt",
            "updatedAt",
          ],
          order: [["createdAt", "ASC"]],
        },
        {
          model: User,
          as: "userFirst",
          attributes: ["id", "firstName", "lastName", "displayName", "avatar"],
        },
        {
          model: User,
          as: "userSecond",
          attributes: ["id", "firstName", "lastName", "displayName", "avatar"],
        },
      ],
    });
    if (conversation) {
      conversation.dataValues.participant0 === req.tokenData.userId
        ? (conversation.dataValues.interlocutor =
            conversation.dataValues.userSecond)
        : (conversation.dataValues.interlocutor =
            conversation.dataValues.userFirst);
      delete conversation.dataValues.userFirst;
      delete conversation.dataValues.userSecond;
      delete conversation.dataValues.participant0;
      delete conversation.dataValues.participant1;
      res.status(200).send(conversation);
    } else {
      const interlocutor = await userQueries.findUser({
        id: req.body.interlocutorId,
      });
      res.status(200).send({
        messages: [],
        interlocutor: {
          firstName: interlocutor.firstName,
          lastName: interlocutor.lastName,
          displayName: interlocutor.displayName,
          id: interlocutor.id,
          avatar: interlocutor.avatar,
        },
      });
    }
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
    const state = await chatQueries.updateColumnArray(
      columnName,
      index,
      req.body.blackListFlag,
      req.body.participants[0],
      req.body.participants[1]
    );
    res.status(200).send(state);
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
