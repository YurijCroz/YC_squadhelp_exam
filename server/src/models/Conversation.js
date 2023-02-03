"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({ User, Message, Catalog }) {
      Conversation.belongsTo(User, { as: "userFirst", foreignKey: "participant0", targetKey: "id" });
      Conversation.belongsTo(User, { as: "userSecond", foreignKey: "participant1", targetKey: "id" });
      Conversation.hasMany(Message, {
        as: "messages",
        foreignKey: "conversation",
      });
      Conversation.belongsToMany(Catalog, {
        through: "ConversationToCatalog",
        foreignKey: "conversationId",
        targetKey: "id",
      });
    }
  }
  Conversation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      participant0: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      participant1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      blackList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        defaultValue: [false, false],
      },
      favoriteList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        defaultValue: [false, false],
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Conversation",
      tableName: "Conversations",
    }
  );
  return Conversation;
};
