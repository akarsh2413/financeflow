const FinancialInsights = ({ summary, transactions }) => {

  const ratio =
    summary.expense === 0
      ? 0
      : (
          (summary.income / summary.expense) *
          100
        ).toFixed(0);

  const categories = {};

  transactions
    .filter((t) => t.type === "Expense")
    .forEach((t) => {
      categories[t.category] =
        (categories[t.category] || 0) +
        Number(t.amount);
    });

  const topCategory =
    Object.entries(categories).sort(
      (a, b) => b[1] - a[1]
    )[0];

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-semibold mb-5">
        Financial Insights
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Highest Expense Category</span>
          <strong>{topCategory?.[0] || "-"}</strong>
        </div>

        <div className="flex justify-between">
          <span>Income / Expense Ratio</span>
          <strong>{ratio}%</strong>
        </div>

        <div className="flex justify-between">
          <span>Current Savings</span>
          <strong>
            ₹{summary.balance.toLocaleString()}
          </strong>
        </div>

        <div className="flex justify-between">
          <span>Financial Health</span>
          <strong
            className={
              summary.balance > 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {summary.balance > 0
              ? "Healthy"
              : "Needs Attention"}
          </strong>
        </div>

      </div>

    </div>

  );
};

export default FinancialInsights;