"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("Users", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        displayName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        avatar: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "anon.png",
        },
        role: {
          type: Sequelize.ENUM("customer", "creator", "moderator"),
          allowNull: false,
        },
        balance: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0,
        },
        refreshToken: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      })
      .then(() =>
        queryInterface.addConstraint("Users", {
          type: "check",
          fields: ["balance"],
          where: {
            balance: {
              [Sequelize.Op.gte]: 0,
            },
          },
        })
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
