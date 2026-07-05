
import { useState } from "react";
import {
  deleteTransaction,
  updateTransaction,
} from "../../services/transactionService";
import toast from "react-hot-toast";

const TransactionTable = ({
  transactions = [],
  refreshTransactions = () => {},
}) => {
  // Normalize transactions prop to an array in case API returns an object
  const transactionsList = Array.isArray(transactions)
    ? transactions
    : transactions?.transactions ?? [];
  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    type: "Income",
    category: "",
  });

  // Delete Transaction
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);

      toast.success("Transaction Deleted Successfully");

      refreshTransactions();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting transaction");
    }
  };

  // Open Edit Form
  const handleEdit = (transaction) => {
    setEditingId(transaction._id);

    setEditForm({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
    });
  };

  // Update Transaction
  const handleUpdate = async () => {
    try {
      await updateTransaction(editingId, editForm);

      toast.success("Transaction Updated Successfully");

      setEditingId(null);

      refreshTransactions();
    } catch (error) {
      console.log(error);
      toast.error("Error Updating Transaction");
    }
  };

  // Search & Filter
  const filteredTransactions = transactionsList.filter((transaction) => {
    const matchesSearch =
      transaction.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "All"
        ? true
        : transaction.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      {/* Heading */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Transactions
        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          {filteredTransactions.length} Records
        </span>

      </div>

      {/* Search & Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="flex-1 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value)
          }
          className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

      </div>

      {/* Edit Form */}

      {editingId && (
        <div className="bg-slate-100 rounded-2xl p-5 mb-6">

          <h3 className="text-xl font-semibold mb-4">
            Edit Transaction
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  title: e.target.value,
                })
              }
              className="border rounded-lg p-3"
              placeholder="Title"
            />

            <input
              type="number"
              value={editForm.amount}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  amount: e.target.value,
                })
              }
              className="border rounded-lg p-3"
              placeholder="Amount"
            />

            <input
              type="text"
              value={editForm.category}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  category: e.target.value,
                })
              }
              className="border rounded-lg p-3"
              placeholder="Category"
            />

            <select
              value={editForm.type}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  type: e.target.value,
                })
              }
              className="border rounded-lg p-3"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

          </div>

          <div className="flex gap-3 mt-5">

            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Save Changes
            </button>

            <button
              onClick={() =>
                setEditingId(null)
              }
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* Table */}

      <div className="hidden md:block overflow-x-auto rounded-xl">

        <table className="w-full">

          <thead className="hidden md:table-header-group bg-slate-100">

            <tr className="md:table-row">

              <th className="p-4 text-left">Title</th>

              <th className="p-4 text-left">Amount</th>

              <th className="p-4 text-left">Type</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (

                <tr
                  key={transaction._id}
                  className="md:table-row block border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-medium">
                    <span className="md:hidden block text-sm text-gray-500">Title</span>
                    {transaction.title}
                  </td>

                  <td className="p-4 font-semibold">
                    <span className="md:hidden block text-sm text-gray-500">Amount</span>
                    ₹{Number(transaction.amount).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span className="md:hidden block text-sm text-gray-500">Type</span>
                    <div className="inline-block">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          transaction.type === "Income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="md:hidden block text-sm text-gray-500">Category</span>
                    {transaction.category}
                  </td>

                  <td className="p-4">
                    <span className="md:hidden block text-sm text-gray-500">Date</span>
                    {new Date(
                      transaction.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          handleEdit(transaction)
                        }
                        aria-label={`Edit ${transaction.title}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-3 md:py-1 rounded-lg transition text-sm min-w-[72px]"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(transaction._id)
                        }
                        aria-label={`Delete ${transaction.title}`}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 md:px-3 md:py-1 rounded-lg transition text-sm min-w-[72px]"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            ) : (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No Transactions Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
      {/* Mobile Transaction Cards */}

<div className="md:hidden space-y-4">

  {filteredTransactions.length > 0 ? (

    filteredTransactions.map((transaction) => (

      <div
        key={transaction._id}
        className="bg-white border rounded-2xl shadow-sm p-4"
      >

        <div className="flex justify-between items-start">

          <div>

            <h3 className="font-bold text-lg">
              {transaction.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {transaction.category}
            </p>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              transaction.type === "Income"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {transaction.type}
          </span>

        </div>

        <div className="mt-4 space-y-2">

          <div className="flex justify-between">

            <span className="text-gray-500">
              Amount
            </span>

            <span className="font-semibold">
              ₹{Number(transaction.amount).toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Date
            </span>

            <span>
              {new Date(transaction.date).toLocaleDateString()}
            </span>

          </div>

        </div>

        <div className="flex gap-3 mt-5">

          <button
            onClick={() => handleEdit(transaction)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(transaction._id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>

    ))

  ) : (

    <div className="text-center py-10 text-gray-500">
      No Transactions Found
    </div>

  )}

</div>

    </div>
  );
};

export default TransactionTable;