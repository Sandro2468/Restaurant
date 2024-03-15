'use strict';

const fs = require('fs');

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersValue = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))

    const data = usersValue.map((el)=>{
      delete el.id
      el.password = hashPassword(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Users', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', data);

  }
};
