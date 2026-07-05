const Goal = require("../models/Goal");

// ==========================
// Create Goal
// ==========================
const createGoal = async (req, res) => {
  try {
    const { title, targetAmount, targetDate } = req.body;

    const goal = await Goal.create({
      user: req.user._id,
      title,
      targetAmount,
      targetDate,
      currentAmount: 0,
    });

    res.status(201).json({
      success: true,
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Goals
// ==========================
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      goals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Goal
// ==========================
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    goal.title = req.body.title || goal.title;
    goal.targetAmount =
      req.body.targetAmount || goal.targetAmount;
    goal.targetDate =
      req.body.targetDate || goal.targetDate;

    await goal.save();

    res.status(200).json({
      success: true,
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Goal
// ==========================
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Add Money to Goal
// ==========================
const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    goal.currentAmount += Number(amount);

    if (goal.currentAmount >= goal.targetAmount) {
      goal.currentAmount = goal.targetAmount;
      goal.status = "Completed";
    }

    await goal.save();

    res.status(200).json({
      success: true,
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  addMoney,
};