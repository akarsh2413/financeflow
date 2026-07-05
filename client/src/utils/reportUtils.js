export const generateSummary = (transactions = []) => {
  const safeTransactions = Array.isArray(transactions)
    ? transactions
    : [];

  const income = safeTransactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const expense = safeTransactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  return {
    income,
    expense,
    savings: income - expense,
    transactions: safeTransactions.length,
  };
};

export const generateExpenseBreakdown = (transactions = []) => {
  const expenses = (Array.isArray(transactions) ? transactions : []).filter(
    (item) => item.type === "Expense"
  );

  const categoryMap = {};

  expenses.forEach((item) => {
    categoryMap[item.category] =
      (categoryMap[item.category] || 0) + Number(item.amount);
  });

  return Object.keys(categoryMap).map((category) => ({
    category,
    amount: categoryMap[category],
  }));
};