const express = require("express");
const router = express.Router();
const {
  createEvent,
  updateEvent,
  getEvents,
  getEventById,
  deleteEvent,
  getEventMemories,
  uploadEventMemories,
  deleteEventMemory,
} = require("../controllers/eventController");

const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 

// Define which fields contain files for Create/Update Event
// ❌ Removed 'certFile' - only handling event cover image now
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 }
]);

// --- Standard Event Routes ---

router.route("/")
  .get(getEvents)
  .post(protect, admin, uploadFields, createEvent);

router.route("/:id")
  .get(getEventById)
  .put(protect, admin, uploadFields, updateEvent)
  .delete(protect, admin, deleteEvent);

// --- 📸 Memories / Gallery Routes ---

router.route("/:id/memories")
  .get(getEventMemories) 
  .post(
    protect, 
    admin, 
    upload.array('images', 10), 
    uploadEventMemories
  );

router.route("/:id/memories/:imageId")
  .delete(protect, admin, deleteEventMemory);

module.exports = router;