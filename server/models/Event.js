const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, // Short description for cards
      required: true,
    },
    fullDescription: {
      type: String, // Long description for detail page
    },
    venue: {
      type: String,
      required: true,
    },
    
    // Google Maps Link Field
    mapUrl: {
      type: String, 
    },

    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "past", "cancelled"],
      default: "upcoming",
    },
    maxAttendees: {
      type: Number,
      default: 100,
    },
    
    // --- Images ---
    imageUrl: {
      type: String, // Main Event Thumbnail: "/uploads/filename.jpg"
    },
    
    // Legacy simple gallery (Keep this if you use it elsewhere, or migrate to memories)
    galleryImages: [
      {
        type: String,
      },
    ],

    // Memories Gallery (for the Admin Upload & Memories Page)
    memories: [
      {
        url: { type: String, required: true },
        publicId: { type: String }, // Stores filename for local deletion
        uploadedAt: { type: Date, default: Date.now }
      }
    ],
    
    // --- Registration Logic ---
    isRegistrationEnabled: {
      type: Boolean,
      default: true,
    },

    // ❌ Certificate Logic REMOVED
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;