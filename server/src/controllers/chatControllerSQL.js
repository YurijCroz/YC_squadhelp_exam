"use strict";
const {
  User,
  Message,
  Catalog,
  Conversation,
  ConversationToCatalog,
  Sequelize,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

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
      const message = chat.dataValues.messages[0].dataValues;
      delete chat.dataValues.messages;
      delete chat.dataValues.userFirst;
      delete chat.dataValues.userSecond;
      delete chat.dataValues.participant0;
      delete chat.dataValues.participant1;
      chat.dataValues = { ...message, ...chat.dataValues };
    });
    res.status(200).send(conversations);
  } catch (error) {
    next(error);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
  } catch (error) {
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
  } catch (error) {
    next(error);
  }
};

module.exports.blackList = async (req, res, next) => {
  const participants = req.body.participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  const index = participants.indexOf(req.tokenData.userId);
  if (index < 0) return;
  try {
    const state = await sequelize.query(`
      UPDATE "Conversations"
      SET "blackList"[${index + 1}] = ${req.body.blackListFlag}
      WHERE "participant0" = ${req.body.participants[0]}
      AND "participant1" = ${req.body.participants[1]}
      RETURNING *;
    `);
    state[0][0].participants = [
      state[0][0].participant0,
      state[0][0].participant1,
    ];
    delete state[0][0].participant0;
    delete state[0][0].participant1;
    res.status(200).send(state[0][0]);
  } catch (error) {
    next(error);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const participants = req.body.participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  const index = participants.indexOf(req.tokenData.userId);
  if (index < 0) return;
  try {
    const state = await sequelize.query(`
      UPDATE "Conversations"
      SET "favoriteList"[${index + 1}] = ${req.body.favoriteFlag}
      WHERE "participant0" = ${req.body.participants[0]}
      AND "participant1" = ${req.body.participants[1]}
      RETURNING *;
    `);
    state[0][0].participants = [
      state[0][0].participant0,
      state[0][0].participant1,
    ];
    delete state[0][0].participant0;
    delete state[0][0].participant1;
    res.status(200).send(state[0][0]);
  } catch (error) {
    next(error);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
  } catch (error) {
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
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};

// conversations.forEach((el) => {
//   el.dataValues.participants = [
//     el.dataValues.participant0,
//     el.dataValues.participant1,
//   ];
//   delete el.dataValues.participant0;
//   delete el.dataValues.participant1;
// });

// right: true,
// key: "participant0",
// where: {
//   id: {
//     [Op.ne]: req.tokenData.userId,
//   },
// },
