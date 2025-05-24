const express = require("express");
const Router = express.Router();
const AuthController = require("../controllers/Auth");

Router.route("/register").post(AuthController.register);
Router.route('/login').post(AuthController.Login);

module.exports = Router;
