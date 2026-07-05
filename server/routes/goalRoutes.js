const express = require("express");

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  addMoney,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create Goal
router.post("/", protect, createGoal);

// Get All Goals
router.get("/", protect, getGoals);

// Update Goal
router.put("/:id", protect, updateGoal);

// Delete Goal
router.delete("/:id", protect, deleteGoal);

// Add Money to Goal
router.patch("/:id/add-money", protect, addMoney);

module.exports = router;