const express = require("express");
const authRouter = express.Router();
const AuthController = require("../controllers/authController");
// Đăng ký tài khoản
console.log("AuthController:", AuthController);
console.log("Create method:", AuthController.create);

authRouter.post("/create", AuthController.create);
authRouter.post("/login", AuthController.login);


module.exports = authRouter;
