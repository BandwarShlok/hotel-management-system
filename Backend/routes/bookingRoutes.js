const express = require("express");
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* CUSTOMER – CREATE BOOKING */
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Access denied" });
  }

  const booking = new Booking({
    ...req.body,
    userId: req.user.id
  });

  await booking.save();
  res.status(201).json(booking);
});

/* CUSTOMER – GET OWN BOOKINGS */
router.get("/my", auth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id });
  res.json(bookings);
});

/* ADMIN – GET ALL BOOKINGS */
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const bookings = await Booking.find().populate("roomId userId");
  res.json(bookings);
});

/* ADMIN – UPDATE BOOKING STATUS */
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(booking);
});

module.exports = router;
