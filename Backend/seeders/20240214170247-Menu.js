'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const menusValue = JSON.parse(fs.readFileSync('./data/menu.json', 'utf-8'))

    const data = menusValue.map((el)=>{
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Menus', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Menus', data);

  }
};
