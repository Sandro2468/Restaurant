"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderTime: {
        type: Sequelize.DATEONLY,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      totalCost: {
        type: Sequelize.FLOAT,
      },
      paymentType: {
        type: Sequelize.STRING,
      },
      paymentAmount: {
        type: Sequelize.FLOAT,
      },
      paymentChange: {
        type: Sequelize.FLOAT,
      },
      paymentStatus: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      MenuId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Menus",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
