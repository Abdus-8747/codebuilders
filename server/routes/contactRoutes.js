const express = require("express");
const router = express.Router();
const { 
  submitContactForm, 
  getAllMessages, 
  markAsRead,    // 👈 Imported new controller function
  deleteMessage 
} = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public route to send message
router.post("/", submitContactForm);

// Admin routes to view, manage, and delete messages
router.get("/", protect, admin, getAllMessages);
router.put("/:id/read", protect, admin, markAsRead); // 👈 Added PUT route for marking as read
router.delete("/:id", protect, admin, deleteMessage);

module.exports = router;