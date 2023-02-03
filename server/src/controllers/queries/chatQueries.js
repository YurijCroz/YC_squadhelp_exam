"use strict";
const {
  User,
  Message,
  Catalog,
  Conversation,
  ConversationToCatalog,
  Sequelize,
  sequelize,
} = require("../../models");
const { Op } = require("sequelize");

module.exports.userAuthenticationForCatalog = async (where) => {
  const result = await Catalog.findOne({
    where: { ...where },
    attributes: ["id"],
  });
  return result;
};

module.exports.userAuthenticationForChat = async (chatId, userId) => {
  const result = await Conversation.findOne({
    where: {
      id: chatId,
      [Op.or]: [{ participant0: userId }, { participant1: userId }],
    },
    attributes: ["id"],
  });
  return result;
};

module.exports.getCatalog = async (catalogId, userId) => {
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
};

module.exports.updateColumnArray = async (
  columnName,
  index,
  flag,
  firstUser,
  secondUser
) => {
  const state = await sequelize.query(`
      UPDATE "Conversations"
      SET "${columnName}"[${index + 1}] = ${flag}
      WHERE "participant0" = ${firstUser}
      AND "participant1" = ${secondUser}
      RETURNING *;
    `);
  state[0][0].participants = [
    state[0][0].participant0,
    state[0][0].participant1,
  ];
  delete state[0][0].participant0;
  delete state[0][0].participant1;
  return state[0][0];
};
