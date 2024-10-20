const express = require("express");
const {
  createUser,
  loginController,
  logoutController,
  getUser,
} = require("../controller/UserController");

const Router = express.Router();

Router.post("/register", createUser);
Router.post("/login", loginController);
Router.get("/logout", logoutController);
Router.get("/get-user/:id", getUser);
module.exports = Router;
