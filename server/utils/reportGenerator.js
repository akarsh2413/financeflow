const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");

const generateMonthlyReport = async (userId, month, year) => {
  const startDate = new Date(year, month - 1, 1);

  const endDate = new Date(year, month, 1);

  const transactions = await Transaction.find({
    user: userId,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  });

  const budget = await Budget.findOne({
    user: userId,
    month,
    year,
  });

  let income = 0;
  let expense = 0;

  let highestIncome = 0;
  let highestExpense = 0;

  const categoryTotals = {};

  transactions.forEach((transaction) => {
    if (transaction.type === "Income") {
      income += transaction.amount;

      if (transaction.amount > highestIncome) {
        highestIncome = transaction.amount;
      }
    } else {
      expense += transaction.amount;

      if (transaction.amount > highestExpense) {
        highestExpense = transaction.amount;
      }

      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) +
        transaction.amount;
    }
  });

  let highestCategory = "N/A";
  let highestCategoryAmount = 0;

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > highestCategoryAmount) {
      highestCategory = category;
      highestCategoryAmount = amount;
    }
  });

  const savings = income - expense;

  const budgetAmount = budget ? budget.amount : 0;

  const remainingBudget = budgetAmount - expense;

  const budgetUsed =
    budgetAmount > 0
      ? ((expense / budgetAmount) * 100).toFixed(1)
      : 0;

  return {
    month,
    year,

    income,
    expense,
    savings,

    budget: budgetAmount,
    remainingBudget,
    budgetUsed,

    totalTransactions: transactions.length,

    highestIncome,
    highestExpense,

    highestCategory,
    highestCategoryAmount,
  };
};

module.exports = generateMonthlyReport;