"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ConversationToCatalog extends Model {
    static associate(models) {}
  }
  ConversationToCatalog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      catalogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "ConversationToCatalog",
      tableName: "ConversationsToCatalogs",
    }
  );
  return ConversationToCatalog;
};
