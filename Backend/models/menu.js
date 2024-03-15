'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.belongsToMany(models.User, { through: models.Order, foreignKey: "MenuId" })
      Menu.hasMany(models.Order, {foreignKey: "MenuId"})
    }
  }
  Menu.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Item name required!"
        },
        notEmpty: {
          msg: "Item name required!"
        }
      }
    },
    itemImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Item Image required!"
        },
        notEmpty: {
          msg: "Item Image required!"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description required!"
        },
        notEmpty: {
          msg: "Description required!"
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category required!"
        },
        notEmpty: {
          msg: "Category required!"
        }
      }
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock Keeping Unit code required!"
        },
        notEmpty: {
          msg: "Stock Keeping Unit code required!"
        }
      }
    },
    itemStock:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Item quantity/stock number required!"
        },
        notEmpty: {
          msg: "Item quantity/stock number required!"
        }
      }
    },
    availability: {
      type: DataTypes.STRING,
      defaultValue: "Ready"
    }
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};