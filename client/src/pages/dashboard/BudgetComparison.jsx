const BudgetComparison = ({ summary, budget }) => {
  if (!budget) return null;

  const budgetAmount = budget.amount;
  const expense = summary.expense;
  const remaining = Math.max(budgetAmount - expense, 0);

  const expensePercent =
    budgetAmount > 0
      ? Math.min((expense / budgetAmount) * 100, 100)
      : 0;

  const remainingPercent =
    budgetAmount > 0
      ? (remaining / budgetAmount) * 100
      : 0;

  const getStatus = () => {
    if (expensePercent >= 100)
      return {
        text: "Budget Exceeded",
        color: "text-red-600",
      };

    if (expensePercent >= 80)
      return {
        text: "Budget Warning",
        color: "text-yellow-600",
      };

    return {
      text: "Healthy Spending",
      color: "text-green-600",
    };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-semibold mb-6">
        Budget vs Expense
      </h2>

      {/* Budget */}

      <div className="mb-6">

        <div className="flex justify-between mb-2">
          <span>Budget</span>
          <span className="font-semibold">
            ₹{budgetAmount.toLocaleString()}
          </span>
        </div>

        <div className="w-full h-4 bg-blue-100 rounded-full">
          <div
            className="h-4 bg-blue-600 rounded-full"
            style={{ width: "100%" }}
          />
        </div>

      </div>

      {/* Expense */}

      <div className="mb-6">

        <div className="flex justify-between mb-2">
          <span>Expense</span>
          <span className="font-semibold text-red-600">
            ₹{expense.toLocaleString()}
          </span>
        </div>

        <div className="w-full h-4 bg-red-100 rounded-full">
          <div
            className="h-4 bg-red-600 rounded-full transition-all duration-700"
            style={{
              width: `${expensePercent}%`,
            }}
          />
        </div>

      </div>

      {/* Remaining */}

      <div className="mb-6">

        <div className="flex justify-between mb-2">
          <span>Remaining</span>
          <span className="font-semibold text-green-600">
            ₹{remaining.toLocaleString()}
          </span>
        </div>

        <div className="w-full h-4 bg-green-100 rounded-full">
          <div
            className="h-4 bg-green-600 rounded-full transition-all duration-700"
            style={{
              width: `${remainingPercent}%`,
            }}
          />
        </div>

      </div>

      <div className="border-t pt-5">

        <div className="flex justify-between">

          <span>Status</span>

          <span className={`font-bold ${status.color}`}>
            {status.text}
          </span>

        </div>

      </div>

    </div>
  );
};

export default BudgetComparison;