const CONSTANTS = require("../constants");
const bcrypt = require("bcrypt");

const { MODER, SALT_ROUNDS } = CONSTANTS;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: MODER,
          lastName: MODER,
          displayName: MODER,
          password: bcrypt.hashSync(MODER, SALT_ROUNDS),
          email: "moderator@gmail.com",
          avatar: "anon.png",
          role: MODER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
