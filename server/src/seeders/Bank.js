const bankCard = [
  {
    cardNumber: "4564654564564564",
    name: "SquadHelp",
    expiry: "11/23",
    cvc: "453",
    balance: 2000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    cardNumber: "4111111111111111",
    name: "yriy",
    expiry: "09/23",
    cvc: "505",
    balance: 5000,
    createdAt: new Date(),
    updatedAt: new Date()
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
