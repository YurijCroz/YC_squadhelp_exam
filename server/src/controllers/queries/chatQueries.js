"use strict";
const {
  Catalog,
  Conversation,
  User,
  Message,
  sequelize,
} = require("../../models");
const NotFound = require("../../errors/UserNotFoundError");
const { Op } = require("sequelize");
const { logger } = require("../../log");

module.exports.userAuthenticationForCatalog = async (where) => {
  try {
    const result = await Catalog.findOne({
      where: { ...where },
      attributes: ["id"],
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
};

module.exports.userAuthenticationForChat = async (chatId, userId) => {
  try {
    const result = await Conversation.findOne({
      where: {
        id: chatId,
        [Op.or]: [{ participant0: userId }, { participant1: userId }],
      },
      attributes: ["id"],
    });
    return result;
  } catch (error) {
    logger.error(error);
  }
};

module.exports.getCatalog = async (catalogId, userId) => {
  try {
    const catalog = await Catalog.findOne({
      where: {
        id: catalogId,
        userId: userId,
      },
      attributes: ["id", "catalogName"],
      include: {
        model: Conversation,
        attributes: ["id"],
      },
    });
    catalog.dataValues.chats = catalog.dataValues.Conversations.map(
      (el) => el.id
    );
    delete catalog.dataValues.Conversations;
    return catalog;
  } catch (error) {
    logger.error(error);
  }
};

module.exports.updateColumnArray = async (
  columnName,
  flag,
  participants,
  tokenUserId
) => {
  const sortParticipants = participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  const index = sortParticipants.indexOf(tokenUserId);
  const [firstUser, secondUser] = sortParticipants;
  try {
    if (index < 0) {
      throw new NotFound("user with this data didn`t exist");
    }
    const [state] = await sequelize.query(
      `
        UPDATE "Conversations"
        SET "${columnName}"[${index + 1}] = ${flag}
        WHERE "participant0" = ${firstUser}
        AND "participant1" = ${secondUser}
        RETURNING *;
      `,
      { nest: true, raw: true }
    );
    state.participants = [state.participant0, state.participant1];
    delete state.participant0;
    delete state.participant1;
    return state;
  } catch (error) {
    logger.error(error);
  }
};

module.exports.findLastMsgAndDetails = async (userId) => {
  try {
    const conversations = JSON.stringify(
      await Conversation.findAll({
        where: {
          [Op.or]: [{ participant0: userId }, { participant1: userId }],
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
            attributes: [
              "id",
              "firstName",
              "lastName",
              "displayName",
              "avatar",
            ],
          },
          {
            model: User,
            as: "userSecond",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "displayName",
              "avatar",
            ],
          },
          {
            model: Message,
            as: "messages",
            attributes: ["sender", ["body", "text"], "createdAt"],
            order: [["createdAt", "DESC"]],
            limit: 1,
          },
        ],
      })
    );
    return JSON.parse(conversations);
  } catch (error) {
    logger.error(error);
  }
};

module.exports.findInterlocutorAndMessages = async (
  interlocutorId,
  tokenUserId
) => {
  const [firstUser, secondUser] =
    tokenUserId <= interlocutorId
      ? [tokenUserId, interlocutorId]
      : [interlocutorId, tokenUserId];
  const alias =
    firstUser === tokenUserId ? "conversationSecond" : "conversationFirst";
  try {
    const data = JSON.stringify(
      await User.findOne({
        where: {
          id: interlocutorId,
        },
        attributes: ["id", "firstName", "lastName", "displayName", "avatar"],
        include: [
          {
            model: Conversation,
            as: alias,
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
                required: false,
              },
            ],
            required: false,
          },
        ],
      })
    );
    if (data) {
      const interlocutorAndMessages = JSON.parse(data);
      interlocutorAndMessages.conversation = interlocutorAndMessages[alias];
      delete interlocutorAndMessages[alias];
      return interlocutorAndMessages;
    } else {
      throw new NotFound("user with this data didn`t exist");
    }
  } catch (error) {
    logger.error(error);
  }
};
