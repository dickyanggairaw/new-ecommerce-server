'use strict';

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
   let admin = [
     {
     email: "admin@mail.com",
     password: bcrypt.hashSync("apaan", 10),
     role: "admin",
     createdAt: new Date(),
     updatedAt: new Date()
    },
    {
      email: "customer@mail.com",
      password: bcrypt.hashSync("apaan", 10),
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ]
   await queryInterface.bulkInsert('Users', admin, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
