const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    console.log("<--- Authentication working!");

    const { access_token } = req.headers;
    
    if (!access_token) {
      throw { name: "InvalidToken" };
    }

    const decodedToken = verifyToken(access_token);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findByPk(decodedToken.id);
    // console.log(user);
    if (!user) {
      throw { name: "InvalidToken" };
    }

    req.login = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = authentication;
