const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const authMiddleware = require("../middleware/authMiddleware");

/* GET ALL ROOMS */
router.get("/", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

/* ADD ROOM (ADMIN) */
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* DELETE ROOM */
router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "Room deleted" });
});

module.exports = router;
