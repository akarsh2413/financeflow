const express = require("express");

const router = express.Router();

const {
  saveBudget,
  getBudget,
  getAllBudgets,
} = require("../controllers/budgetController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, saveBudget);

router.get("/", protect, getBudget);

router.get("/all", protect, getAllBudgets);

module.exports = router;