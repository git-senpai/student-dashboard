const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const auth = require("../middleware/auth");

// All routes are protected
router.use(auth);

// Get user's notifications
router.get("/", notificationController.getUserNotifications);

// Mark notification as read
router.patch("/:id/read", notificationController.markAsRead);

// Mark all notifications as read
router.patch("/read-all", notificationController.markAllAsRead);

// Delete notification
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
