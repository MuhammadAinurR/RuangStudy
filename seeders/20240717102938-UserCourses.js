'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const data = require('../data/UserCourses.json').map(e => {
    return {
      ...e,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   })
   await queryInterface.bulkInsert('UserCourses', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserCourses', null, {})
  }
};
