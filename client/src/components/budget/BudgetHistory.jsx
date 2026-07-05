const BudgetHistory = ({
  budgets,
  onSelect,
}) => {
  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Budget History
      </h2>

      {budgets.length === 0 ? (
        <p className="text-gray-500">
          No budgets created yet.
        </p>
      ) : (
        <div className="space-y-3">

          {budgets.map((budget) => (

            <div
              key={budget._id}
              onClick={() =>
                onSelect(budget)
              }
              className="flex justify-between items-center border rounded-xl p-4 hover:bg-blue-50 cursor-pointer transition"
            >

              <div>

                <h3 className="font-semibold">

                  {months[budget.month]} {budget.year}

                </h3>

                <p className="text-gray-500 text-sm">
                  Monthly Budget
                </p>

              </div>

              <div className="text-xl font-bold text-blue-600">

                ₹{budget.amount.toLocaleString()}

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default BudgetHistory;