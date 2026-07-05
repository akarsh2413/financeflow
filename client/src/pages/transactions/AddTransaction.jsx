import { useState } from "react";
import { addTransaction } from "../../services/transactionService";
import toast from "react-hot-toast";
import {
  FaMoneyBillWave,
  FaWallet,
  FaCalendarAlt,
  FaStickyNote,
} from "react-icons/fa";

const incomeCategories = [
  "Salary",
  "Freelance",
  "Business",
  "Investment",
  "Gift",
  "Interest",
  "Other",
];

const expenseCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Rent",
  "Bills",
  "Entertainment",
  "Medical",
  "Education",
  "Travel",
  "Other",
];

const paymentMethods = [
  "Cash",
  "UPI",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Wallet",
];

const AddTransaction = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Expense",
    category: "Food",
    paymentMethod: "Cash",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const categories =
    formData.type === "Income"
      ? incomeCategories
      : expenseCategories;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData({
        ...formData,
        type: value,
        category:
          value === "Income"
            ? incomeCategories[0]
            : expenseCategories[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await addTransaction(formData);

      toast.success("Transaction Added Successfully!");

      setFormData({
        title: "",
        amount: "",
        type: "Expense",
        category: "Food",
        paymentMethod: "Cash",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-2">
          ➕ Add New Transaction
        </h1>

        <p className="text-gray-500 mb-8">
          Record your income and expenses to keep your finances organized.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Title */}

          <div>
            <label className="font-semibold block mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="e.g. Monthly Salary"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Amount */}

          <div>
            <label className="font-semibold block mb-2">
              Amount
            </label>

            <div className="relative">

              <FaMoneyBillWave className="absolute left-4 top-4 text-gray-400" />

              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

          </div>

          {/* Type */}

          <div>

            <label className="font-semibold block mb-2">
              Transaction Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

          </div>

          {/* Category */}

          <div>

            <label className="font-semibold block mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

          </div>

          {/* Payment */}

          <div>

            <label className="font-semibold block mb-2">
              Payment Method
            </label>

            <div className="relative">

              <FaWallet className="absolute left-4 top-4 text-gray-400" />

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {paymentMethods.map((method) => (
                  <option
                    key={method}
                    value={method}
                  >
                    {method}
                  </option>
                ))}
              </select>

            </div>

          </div>

          {/* Date */}

          <div>

            <label className="font-semibold block mb-2">
              Date
            </label>

            <div className="relative">

              <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

          </div>

          {/* Notes */}

          <div className="md:col-span-2">

            <label className="font-semibold block mb-2">
              Notes
            </label>

            <div className="relative">

              <FaStickyNote className="absolute left-4 top-4 text-gray-400" />

              <textarea
                rows="4"
                name="notes"
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 pl-12 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />

            </div>

          </div>

          {/* Button */}

          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition duration-300 disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : "💾 Save Transaction"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddTransaction;