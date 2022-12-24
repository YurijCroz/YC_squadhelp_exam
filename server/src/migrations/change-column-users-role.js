"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM("customer", "creator", "moderator"),
      allowNull: false,
    });
  },
};
