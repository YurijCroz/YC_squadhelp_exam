const bankCard = [
  {
    cardNumber: "4564654564564565",
    name: "SquadHelp",
    expiry: "11/22",
    cvc: "453",
    balance: 2000
  },
  {
    cardNumber: "4111111111111112",
    name: "yriy",
    expiry: "09/23",
    cvc: "505",
    balance: 5000
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
