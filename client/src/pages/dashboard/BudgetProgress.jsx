import { Link } from "react-router-dom";

const BudgetProgress = ({ summary, budget }) => {
  if (!budget) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">
          Monthly Budget
        </h2>

        <div className="flex flex-col items-center justify-center py-10">

          <div className="text-6xl mb-4">
            💰
          </div>

          <h3 className="text-2xl font-bold text-gray-800">
            No Budget Set
          </h3>

          <p className="text-gray-500 mt-3 text-center">
            No budget has been created for the selected month.
          </p>

          <p className="text-sm text-gray-400 text-center mt-1 mb-6">
            Create a monthly budget to start tracking your spending.
          </p>

          <Link
            to="/budget"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Create Budget
          </Link>

        </div>
      </div>
    );
  }

  const monthlyBudget = budget.amount;

  const actualPercent =
    monthlyBudget > 0
      ? (summary.expense / monthlyBudget) * 100
      : 0;

  const progressPercent = Math.min(actualPercent, 100);

  const remaining = monthlyBudget - summary.expense;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold">
            Monthly Budget
          </h2>

          <p className="text-gray-500 text-sm">
            {new Date(
              budget.year,
              budget.month - 1
            ).toLocaleString("default", {
              month: "long",
            })}{" "}
            {budget.year}
          </p>

        </div>

        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            actualPercent >= 100
              ? "bg-red-100 text-red-700"
              : actualPercent >= 80
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {actualPercent.toFixed(0)}%
        </div>

      </div>

      {/* Budget Cards */}

      <div className="grid grid-cols-2 gap-5 mb-6">

        <div className="bg-blue-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Budget
          </p>

          <h3 className="text-2xl font-bold text-blue-700 mt-1">
            ₹{monthlyBudget.toLocaleString()}
          </h3>

        </div>

        <div
          className={`rounded-xl p-4 ${
            remaining >= 0
              ? "bg-green-50"
              : "bg-red-50"
          }`}
        >

          <p className="text-sm text-gray-500">
            Remaining
          </p>

          <h3
            className={`text-2xl font-bold mt-1 ${
              remaining >= 0
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            ₹{remaining.toLocaleString()}
          </h3>

        </div>

      </div>

      {/* Progress */}

      <div>

        <div className="flex justify-between mb-2">

          <span className="text-sm text-gray-500">
            Spent
          </span>

          <span className="font-semibold">
            ₹{summary.expense.toLocaleString()} / ₹
            {monthlyBudget.toLocaleString()}
          </span>

        </div>

        <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

          <div
            className={`h-full transition-all duration-700 ${
              actualPercent >= 100
                ? "bg-red-600"
                : actualPercent >= 80
                ? "bg-yellow-500"
                : "bg-blue-600"
            }`}
            style={{
              width: `${progressPercent}%`,
            }}
          />

        </div>

      </div>

      <div className="flex justify-between mt-6 text-sm">

        <span className="text-gray-500">
          {actualPercent.toFixed(1)}% Used
        </span>

        <span
          className={`font-semibold ${
            remaining >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {remaining >= 0
            ? "Within Budget"
            : "Budget Exceeded"}
        </span>

      </div>

    </div>
  );
};

export default BudgetProgress;