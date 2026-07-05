// Dashboard Summary
export const calculateSummary = (transactions) => {
  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  return {
    income,
    expense,
    balance: income - expense,
    savings: income - expense,
  };
};

// Income vs Expense Bar Chart
export const getIncomeExpenseData = (summary) => {
  return [
    {
      name: "Finance",
      Income: summary.income,
      Expense: summary.expense,
    },
  ];
};

// Expense Category Pie Chart
export const getCategoryData = (transactions) => {
  const categoryTotals = {};

  transactions
    .filter((item) => item.type === "Expense")
    .forEach((item) => {
      categoryTotals[item.category] =
        (categoryTotals[item.category] || 0) +
        Number(item.amount);
    });

  return Object.keys(categoryTotals).map((key) => ({
    name: key,
    value: categoryTotals[key],
  }));
};

// Transaction Trend Chart
export const getTrendData = (transactions) => {
  return transactions.map((item) => ({
    name: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    amount: Number(item.amount),
  }));
};

// Quick Statistics
export const getQuickStats = (transactions) => {
  const incomeTransactions = transactions.filter(
    (item) => item.type === "Income"
  );

  const expenseTransactions = transactions.filter(
    (item) => item.type === "Expense"
  );

  const highestIncome =
    incomeTransactions.length > 0
      ? Math.max(
          ...incomeTransactions.map((item) =>
            Number(item.amount)
          )
        )
      : 0;

  const highestExpense =
    expenseTransactions.length > 0
      ? Math.max(
          ...expenseTransactions.map((item) =>
            Number(item.amount)
          )
        )
      : 0;

  const averageTransaction =
    transactions.length > 0
      ? (
          transactions.reduce(
            (total, item) =>
              total + Number(item.amount),
            0
          ) / transactions.length
        ).toFixed(2)
      : 0;

  return {
    totalTransactions: transactions.length,
    incomeCount: incomeTransactions.length,
    expenseCount: expenseTransactions.length,
    highestIncome,
    highestExpense,
    averageTransaction,
  };
};