const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    // ✅ Added isRead field to match the controller logic
    isRead: { 
      type: Boolean, 
      default: false 
    },
    // Kept status for more granular tracking (new vs read vs replied)
    status: { 
      type: String, 
      enum: ["new", "read", "replied"], 
      default: "new" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);