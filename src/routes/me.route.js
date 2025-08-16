const express = require("express");
const meRouter = express.Router();
const meController = require("../controllers/meController");
const authMiddleware = require("../middleware/authMiddleware");

meRouter.get("/follow/:courseId", meController.getUserFollow);

module.exports = meRouter;
