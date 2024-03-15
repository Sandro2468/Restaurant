if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const controller = require("./controllers/controller");
const authentication = require("./middlewares/authentication");
const adminAuthorization = require("./middlewares/authorization");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", controller.userRegister);
app.post("/login", controller.userLogin);
app.post("/google-login", controller.userLoginGoogle);

app.use(authentication);

app.get("/users", controller.showUsers);
app.get("/users/:id", controller.showUsersById);
app.get("/menus", controller.showMenus);

app.get("/menus/:id", controller.showMenusById);
app.delete("/menus/:id", controller.deleteMenusById);
app.get("/orders", controller.showOrders);
app.post("/ordersPayment/:id", controller.orderAndPayment);
app.patch("/updatePayment/:id", controller.updateStatusAfterPayment);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
