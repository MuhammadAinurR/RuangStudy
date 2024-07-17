'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const data = require('../data/Users.json').map(e => {
    const { password, ...rest} = e
    return {
      password: bcrypt.hashSync(password, salt),
      ...rest,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   })
   await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
