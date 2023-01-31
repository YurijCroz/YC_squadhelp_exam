"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ User, Conversation }) {
      Catalog.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
      Catalog.belongsToMany(Conversation, {
        through: "ConversationToCatalog",
        foreignKey: "catalogId",
        targetKey: "id",
      });
    }
  }
  Catalog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      catalogName: {
        type: DataTypes.STRING(64),
        allowNull: false,
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
      modelName: "Catalog",
      tableName: "Catalogs",
    }
  );
  return Catalog;
};
