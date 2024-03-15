"use strict";
const { Model } = require("sequelize");

const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Menu, {
        through: models.Order,
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name required!",
          },
          notEmpty: {
            msg: "Name required!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already taken!",
        },
        validate: {
          notNull: {
            msg: "Email required!",
          },
          notEmpty: {
            msg: "Email required!",
          },
          isEmail: {
            msg: "Wrong email format!",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone number required!",
          },
          notEmpty: {
            msg: "Phone number required!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password required!",
          },
          notEmpty: {
            msg: "Password required!",
          },
          len: {
            args: 5,
            msg: "Minimum number of characters is 5!",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        // defaultValue: "Admin"
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((User) => {
    User.password = hashPassword(User.password);
  });

  return User;
};
