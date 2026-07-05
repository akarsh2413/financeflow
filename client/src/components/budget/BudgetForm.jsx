import { useState, useEffect } from "react";

const BudgetForm = ({
  onSave,
  selectedBudget,
}) => {
  const currentDate = new Date();

  const [month, setMonth] = useState(
    currentDate.getMonth() + 1
  );

  const [year, setYear] = useState(
    currentDate.getFullYear()
  );

  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (selectedBudget) {
      setMonth(selectedBudget.month);
      setYear(selectedBudget.year);
      setAmount(selectedBudget.amount);
    }
  }, [selectedBudget]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) return;

    onSave({
      month: Number(month),
      year: Number(year),
      amount: Number(amount),
    });
  };

  const months = [
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
        Monthly Budget
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-5"
      >

        <select
          value={month}
          onChange={(e) =>
            setMonth(e.target.value)
          }
          className="border rounded-xl p-3"
        >
          {months.map((m, index) => (
            <option
              key={index}
              value={index + 1}
            >
              {m}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) =>
            setYear(e.target.value)
          }
          className="border rounded-xl p-3"
        >
          {[2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
            <option
              key={y}
              value={y}
            >
              {y}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="border rounded-xl p-3"
        />

        <div className="md:col-span-3">

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-3 font-semibold"
          >
            Save Budget
          </button>

        </div>

      </form>

    </div>
  );
};

export default BudgetForm;