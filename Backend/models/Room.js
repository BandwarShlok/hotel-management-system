const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: "Comfortable room"
  },
  availability: {
    type: String,
    enum: ["Available", "Unavailable"],
    default: "Available"
  }
});

module.exports = mongoose.model("Room", roomSchema);
