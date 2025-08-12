const express = require("express");
const authRouter = express.Router();
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
// Đăng ký tài khoản

authRouter.post("/create", AuthController.create);
authRouter.post("/login", AuthController.login);
authRouter.post("/google", AuthController.googleLogin);
authRouter.get("/me", authMiddleware, AuthController.getCurrentUser);
module.exports = authRouter;
