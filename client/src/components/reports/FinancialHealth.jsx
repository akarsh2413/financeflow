const FinancialHealth = ({ summary = {} }) => {
  const income = Number(summary.income || 0);
  const expense = Number(summary.expense || 0);
  const savings = Number(summary.savings || 0);

  const percentageSaved = income > 0 ? (savings / income) * 100 : 0;

  let status = "Needs attention";
  let statusColor = "text-red-600";
  let insight = "Your expenses are close to or above your income.";

  if (savings > 0) {
    status = "Healthy";
    statusColor = "text-green-600";
    insight = "You are building savings steadily and keeping spending under control.";
  } else if (income > 0 && expense < income) {
    status = "Balanced";
    statusColor = "text-blue-600";
    insight = "Your spending is below income, but there is room to improve your savings rate.";
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Financial Health</p>
          <h3 className={`mt-1 text-xl font-semibold ${statusColor}`}>{status}</h3>
        </div>
        <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
          {percentageSaved.toFixed(0)}% saved
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Income</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">₹{income.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">₹{expense.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Savings</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">₹{savings.toLocaleString()}</p>
        </div>
      </div>

      <p className="mt-5 text-sm text-gray-600">{insight}</p>
    </div>
  );
};

export default FinancialHealth;
