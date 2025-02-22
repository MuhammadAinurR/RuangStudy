'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const data = require('../data/Categories.json').map(e => {
    return {
      ...e,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   })
   await queryInterface.bulkInsert('Categories', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
