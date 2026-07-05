const ExpenseBreakdown = ({ breakdown }) => {
  const totalExpense = breakdown.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Expense Breakdown
      </h2>

      {breakdown.length === 0 ? (
        <p className="text-gray-500">
          No expense data available.
        </p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-3">
                  Category
                </th>

                <th className="text-right p-3">
                  Amount
                </th>

                <th className="text-right p-3">
                  %
                </th>

              </tr>

            </thead>

            <tbody>

              {breakdown.map((item) => (

                <tr
                  key={item.category}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-3">
                    {item.category}
                  </td>

                  <td className="p-3 text-right font-semibold">
                    ₹{item.amount.toLocaleString()}
                  </td>

                  <td className="p-3 text-right">

                    {(
                      (item.amount / totalExpense) *
                      100
                    ).toFixed(1)}
                    %

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default ExpenseBreakdown;