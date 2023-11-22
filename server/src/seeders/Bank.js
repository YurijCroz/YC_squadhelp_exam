const CONSTANTS = require("../constants");

const bankCard = [
  {
    cardNumber: CONSTANTS.SQUADHELP_BANK_NUMBER,
    name: CONSTANTS.SQUADHELP_BANK_NAME,
    expiry: CONSTANTS.SQUADHELP_BANK_EXPIRY,
    cvc: CONSTANTS.SQUADHELP_BANK_CVC,
    balance: 2000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cardNumber: "4111111111111111",
    name: "yriy",
    expiry: "09/26",
    cvc: "505",
    balance: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Banks", bankCard, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Banks", null, {});
  },
};
