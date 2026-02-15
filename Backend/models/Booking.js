const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // ✅ CHANGE HERE (ObjectId ➜ String)
  roomId: {
    type: String,
    required: true
  },

  checkIn: {
    type: String,
    required: true
  },

  checkOut: {
    type: String,
    required: true
  },

  guests: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Booked", "Approved", "Cancelled"],
    default: "Booked"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
