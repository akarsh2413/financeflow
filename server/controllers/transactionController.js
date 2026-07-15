const Transaction = require("../models/Transaction");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const budgetAlertTemplate = require("../templates/budgetAlertTemplate");
const Budget = require("../models/Budget");
// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user._id,
    });

    // ==========================
    // Budget Alert Logic
    // ==========================
    if (transaction.type === "Expense") {
      const user = await User.findById(req.user._id);

      const expenses = await Transaction.find({
        user: req.user._id,
        type: "Expense",
      });

      const totalExpense = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

      console.log("========== Budget Check ==========");
      console.log("Budget:", user.monthlyBudget);
      console.log("Expense:", totalExpense);
      console.log("Alert Sent:", user.budgetAlertSent);

      if (
        totalExpense > user.monthlyBudget &&
        !user.budgetAlertSent
      ) {
        const exceededAmount =
          totalExpense - user.monthlyBudget;

        console.log("Sending Budget Email...");

        const html = budgetAlertTemplate(
          user.name,
          user.monthlyBudget,
          totalExpense,
          exceededAmount
        );

        await sendEmail(
          user.email,
          "⚠️ FinanceFlow Budget Alert",
          "",
          html
        );


        console.log("Email Sent!");

        user.budgetAlertSent = true;
        await user.save();
      }
    }

    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/// Get Logged-in User Transactions
const getTransactions = async (req, res) => {
  try {
    const { month, year } = req.query;

    const filter = {
      user: req.user._id,
    };

    if (month && year) {
      const startDate = new Date(
        Number(year),
        Number(month) - 1,
        1
      );

      const endDate = new Date(
        Number(year),
        Number(month),
        1
      );

      filter.date = {
        $gte: startDate,
        $lt: endDate,
      };
    } else if (year) {
      const startDate = new Date(Number(year), 0, 1);

      const endDate = new Date(
        Number(year) + 1,
        0,
        1
      );

      filter.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const transactions = await Transaction.find(filter).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};