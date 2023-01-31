"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User, Conversation }) {
      Message.belongsTo(User, { foreignKey: "sender", targetKey: "id" });
      Message.belongsTo(Conversation, { foreignKey: "conversation", targetKey: "id" });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      conversation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      modelName: "Message",
      tableName: "Messages",
    }
  );
  return Message;
};