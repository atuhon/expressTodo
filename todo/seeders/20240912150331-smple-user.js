'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tables', [
    {
      name: "Taro",
      pass:"pass",
      mail:"pass@ne.jp",
      age:21,
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      name: "ziaro",
      pass:"pass",
      mail:"pass@ne.jp",
      age:21,
      createdAt: new Date(),
      updatedAt:new Date()
    },
  ]);
},

  async down (queryInterface, Sequelize) {
return queryInterface.bulkDelete("User",null,{});
  }
};
