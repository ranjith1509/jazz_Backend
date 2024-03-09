const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcement");

// Route to get all users
router.post("/", announcementController.getAllUsers);

//email sender
router.post("/email", announcementController.emailSender);

module.exports = router;
