"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("Banks", {
        cardNumber: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        expiry: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cvc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        balance: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      })
      .then(() =>
        queryInterface.addConstraint("Banks", {
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
    await queryInterface.dropTable("Banks");
  },
};
