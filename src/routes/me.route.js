const express = require("express");
const meRouter = express.Router();
const meController = require("../controllers/meController");
const authMiddleware = require("../middleware/authMiddleware");
const joinRequestController = require("../controllers/joinRequestController");

meRouter.get("/follow/:courseId", meController.getUserFollow);
meRouter.put("/follow/:courseId", authMiddleware, meController.followCourse);
meRouter.get(
  "/courses-joined/:userId",
  authMiddleware,
  meController.getCoursesJoined
);
meRouter.get("/request", authMiddleware, joinRequestController.getJoinRequests);
meRouter.put("/join", meController.handleJoinCourse);
module.exports = meRouter;
