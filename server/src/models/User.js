"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Offer, { foreignKey: "userId", targetKey: "id" });
      User.hasMany(models.Contest, { foreignKey: "userId", targetKey: "id" });
      User.hasMany(models.Rating, { foreignKey: "userId", targetKey: "id" });
      User.hasMany(models.Conversation, {
        as: "conversationFirst",
        foreignKey: "participant0",
        targetKey: "id",
      });
      User.hasMany(models.Conversation, {
        as: "conversationSecond",
        foreignKey: "participant1",
        targetKey: "id",
      });
      User.hasMany(models.Message, { foreignKey: "sender", targetKey: "id" });
      User.hasMany(models.Catalog, { foreignKey: "userId", targetKey: "id" });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "anon.png",
      },
      role: {
        type: DataTypes.ENUM("customer", "creator", "moderator"),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );
  return User;
};
