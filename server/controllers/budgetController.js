const Budget = require("../models/Budget");

// Create or Update Budget
const saveBudget = async (req, res) => {
  try {
    const { month, year, amount } = req.body;

    let budget = await Budget.findOne({
      user: req.user._id,
      month,
      year,
    });

    if (budget) {
      budget.amount = amount;
      budget.alertSent = false;
      await budget.save();
    } else {
      budget = await Budget.create({
        user: req.user._id,
        month,
        year,
        amount,
      });
    }

    res.status(200).json({
      success: true,
      budget,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Budget
const getBudget = async (req, res) => {
  try {
    const { month, year } = req.query;

    const budget = await Budget.findOne({
      user: req.user._id,
      month,
      year,
    });

    res.status(200).json({
      success: true,
      budget,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Budgets
const getAllBudgets = async (req, res) => {
  try {

    const budgets = await Budget.find({
      user: req.user._id,
    }).sort({
      year: -1,
      month: -1,
    });

    res.status(200).json({
      success: true,
      budgets,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  saveBudget,
  getBudget,
  getAllBudgets,
};