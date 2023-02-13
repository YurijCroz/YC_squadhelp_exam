"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ConversationsToCatalogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      conversationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Conversations",
          key: "id",
        },
      },
      catalogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Catalogs",
          key: "id",
        },
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ConversationsToCatalogs");
  },
};
