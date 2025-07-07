const express = require("express");
const authRouter = express.Router();
const AuthController = require("../controllers/authController");
// Đăng ký tài khoản

authRouter.post("/create", AuthController.create);
authRouter.post("/login", AuthController.login);
authRouter.post("/google", AuthController.googleLogin);

module.exports = authRouter;
