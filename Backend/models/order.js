"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "UserId" });
      Order.belongsTo(models.Menu, { foreignKey: "MenuId" });
      // Order.hasOne(models.Payment, {foreignKey: "OrderId"})
    }
  }
  Order.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderTime: {
        type: DataTypes.DATEONLY,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      totalCost: {
        type: DataTypes.FLOAT,
      },
      paymentType: {
        type: DataTypes.STRING,
        // defaultValue: "Cash"
      },
      paymentAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      paymentChange: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: "Unpaid",
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
      MenuId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
