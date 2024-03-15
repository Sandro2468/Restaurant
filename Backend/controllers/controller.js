const { OAuth2Client, LoginTicket } = require("google-auth-library");
const { passwordCompare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Menu, Order, Payment, Sequelize } = require("../models");
const { Op } = Sequelize;
const midtransClient = require("midtrans-client");
const { sign } = require("jsonwebtoken");

class Controller {
  // menambahkan data baru di tabel User
  static async userLoginGoogle(req, res, next) {
    try {
      const client = new OAuth2Client();
      const tiket = await client.verifyIdToken({
        idToken: req.headers["google_token"],
        audience:
          "26256204905-n00rrdjed465ju6e07ma3k2314cdsn8k.apps.googleusercontent.com",
      });
      const payload = tiket.getPayload();
      console.log(payload);

      const user = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        const newUser = await User.create({
          email: payload.email,
          password: "Dummy-password-" + Date.now() + Math.random(),
          role: "Staff",
        });
        const access_token = signToken({ id: newUser.id });
        res.status(200).json({ access_token });
      } else {
        const access_token = signToken({ id: user.id });

        res.status(200).json({ access_token });
      }

      // const res = await
    } catch (error) {
      console.log(error);
    }
  }

  static async userRegister(req, res, next) {
    try {
      const { name, email, phone, password, role } = req.body;

      console.log(req.body);
      const newUserData = await User.create({
        name,
        email,
        phone,
        password,
        role,
      });

      res.status(201).json({
        message: `User with email ${newUserData.email} has been created`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // fungsi untuk handle user ketika login
  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user || !user.email) {
        throw { name: "AccountNotFound" };
      }

      const passwordValidation = passwordCompare(password, user.password);

      if (!passwordValidation) {
        throw { name: "InvalidPassword" };
      }

      const payload = { id: user.id };

      const access_token = signToken(payload);

      res.status(201).json({
        access_token,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // menampilkan semua data user
  static async showUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // menampilkan semua data user
  static async showUsersById(req, res, next) {
    try {
      const { id } = req.params;
      const users = await User.findAll({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // menampilkan semua data menu, order & payment
  static async showMenus(req, res, next) {
    try {
      const menu = await Menu.findAll({
        include: [
          {
            model: Order,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      });
      res.status(200).json(menu);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  // menampilkan semua data menu, order & payment id terpilih
  static async showMenusById(req, res, next) {
    try {
      const { id } = req.params;

      const menu = await Menu.findAll({
        where: {
          id: id,
        },
        include: [
          {
            model: Order,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      });
      res.status(200).json(menu);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // menampilkan semua data order
  static async showOrders(req, res, next) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Menu,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        order: [["id", "ASC"]],
      });
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // menambahkan data baru di tabel Menu
  static async addMenu(req, res, next) {
    try {
      const {
        name,
        itemImage,
        description,
        price,
        category,
        sku,
        itemStock,
        availability,
      } = req.body;

      // const UserId = req.login.id

      const newMenuItem = await Menu.create({
        name,
        itemImage,
        description,
        price,
        category,
        sku,
        itemStock,
        availability,
      });

      res.status(201).json(newMenuItem);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async deleteMenusById(req, res, next) {
    try {
      const menus = await Menu.findByPk(req.params.id);
      const check = { menus };
      if (!menus || check.menus === null) {
        return res.status(404).json({
          message: "Menu not found!",
        });
      }
      await menus.destroy();
      res.status(200).json({ message: ` ${menus.name} Success To Delete` });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // menampilkan data menu yang dipilih berdasarkan id
  static async addNewOrder(req, res, next) {
    try {
      const UserId = req.login.id;

      const { MenuId } = req.params;

      const menuData = await Menu.findByPk(MenuId);

      if (!menuData) {
        throw { name: "DataNotFound" };
      }

      const { quantity, totalCost } = req.body;

      const newOrder = await Order.create({
        orderTime: new Date(),
        quantity,
        totalCost: quantity * menuData.price,
        UserId,
        MenuId,
      });
      res.status(200).json(newOrder);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // proses pembelian dan update untuk paymentStatus, itemStock, availability
  static async orderAndPayment(req, res, next) {
    try {
      const midtransConfig = {
        isProduction: false,
        serverKey: "SB-Mid-server-rI85cL2i_EC5e0YgTngaYjAU",
      };
      const snap = new midtransClient.Snap(midtransConfig);

      console.log("<--- Order and Payment working!");

      const { id } = req.params;
      const { quantity } = req.body;
      const paymentAmount = 100000000;

      const userId = req.login.id;

      const selectedMenu = await Menu.findByPk(id);

      if (!selectedMenu) {
        throw { name: "MenuNotFound" };
      }

      const totalCost = selectedMenu.price * quantity;

      const order = await Order.create({
        orderTime: new Date(),
        quantity: quantity,
        totalCost: totalCost,
        UserId: userId,
        MenuId: id,
      });

      const paymentChange = paymentAmount - totalCost;
      console.log(paymentChange, "okokoko");
      console.log(totalCost, "totalCost");

      if (paymentChange < 0) {
        throw { name: "PaymentError" };
      }

      let parameter = {
        transaction_details: {
          order_id: `TRANSACTION_${Math.ceil(500 * Math.random() * 1000)}`,
          gross_amount: totalCost,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          id: 1,
          name: req.login.name,
          email: req.login.email,
          phone: req.login.phone,
          role: "Admin",
        },
      };

      const token = await snap.createTransaction(parameter);

      res.status(200).json(token);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async updateStatusAfterPayment(req, res, next) {
    try {
      const { orderId, transactionStatus } = req.body;

      const order = await Order.findByPk(orderId);

      if (!order) {
        throw { name: "OrderNotFound" };
      }

      const { paymentStatus } = order;

      if (paymentStatus !== "Pending") {
        throw { name: "PaymentAlreadyProcessed" };
      }

      await Order.update(
        {
          paymentStatus: transactionStatus,
        },
        {
          where: {
            id: orderId,
          },
        }
      );

      res.status(200).json({
        message: "Payment status updated successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
