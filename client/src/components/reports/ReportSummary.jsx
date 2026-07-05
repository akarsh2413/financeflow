const ReportSummary = ({ summary }) => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <p className="text-gray-500">
          Total Income
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          ₹{summary.income.toLocaleString()}
        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <p className="text-gray-500">
          Total Expense
        </p>

        <h2 className="text-3xl font-bold text-red-600 mt-2">
          ₹{summary.expense.toLocaleString()}
        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <p className="text-gray-500">
          Net Savings
        </p>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">
          ₹{summary.savings.toLocaleString()}
        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <p className="text-gray-500">
          Transactions
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {summary.transactions}
        </h2>

      </div>

    </div>
  );
};

export default ReportSummary;