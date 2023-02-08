"use strict";
const { Catalog, Conversation, sequelize } = require("../../models");
const { Op } = require("sequelize");
const logger = require("../../log");

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
  index,
  flag,
  firstUser,
  secondUser
) => {
  try {
    const state = await sequelize.query(
      `
      UPDATE "Conversations"
      SET "${columnName}"[${index + 1}] = ${flag}
      WHERE "participant0" = ${firstUser}
      AND "participant1" = ${secondUser}
      RETURNING *;
    `,
      { nest: true, raw: true }
    );
    state[0].participants = [state[0].participant0, state[0].participant1];
    delete state[0].participant0;
    delete state[0].participant1;
    return state[0];
  } catch (error) {
    logger.error(error);
  }
};
