import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import GoalCard from "../../components/goals/GoalCard";
import GoalForm from "../../components/goals/GoalForm";
import GoalStats from "../../components/goals/GoalStats";

import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  addMoney,
} from "../../services/goalService";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  const [showAddMoneyModal, setShowAddMoneyModal] =
    useState(false);

  const [selectedGoal, setSelectedGoal] = useState(null);

  const [addMoneyAmount, setAddMoneyAmount] =
    useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await getGoals();

      setGoals(res.goals);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load goals");
    }
  };

  // =============================
  // Create / Update Goal
  // =============================

  const handleSave = async (goal) => {
    try {
      if (editingGoal) {
        await updateGoal(editingGoal._id, goal);

        toast.success("Goal Updated");
      } else {
        await createGoal(goal);

        toast.success("Goal Created");
      }

      setEditingGoal(null);

      fetchGoals();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  // =============================
  // Delete Goal
  // =============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this goal?"
    );

    if (!confirmDelete) return;

    try {
      await deleteGoal(id);

      toast.success("Goal Deleted");

      fetchGoals();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete goal");
    }
  };

  // =============================
  // Edit Goal
  // =============================

  const handleEdit = (goal) => {
    setEditingGoal(goal);
  };

  const handleCancel = () => {
    setEditingGoal(null);
  };

  // =============================
  // Add Money
  // =============================

  const handleAddMoney = (goal) => {
    setSelectedGoal(goal);

    setAddMoneyAmount("");

    setShowAddMoneyModal(true);
  };

  const handleConfirmAddMoney = async () => {
    if (!addMoneyAmount) {
      toast.error("Enter an amount");

      return;
    }

    const amount = Number(addMoneyAmount);

    if (amount <= 0) {
      toast.error("Invalid amount");

      return;
    }

    try {
      await addMoney(selectedGoal._id, amount);

      toast.success("Money Added");

      setShowAddMoneyModal(false);

      setSelectedGoal(null);

      setAddMoneyAmount("");

      fetchGoals();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add money");
    }
  };

  const handleCloseAddMoneyModal = () => {
    setShowAddMoneyModal(false);

    setSelectedGoal(null);

    setAddMoneyAmount("");
  };

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h1 className="text-4xl font-bold">
          Financial Goals
        </h1>

        <p className="text-gray-500 mt-2">
          Track your savings and achieve your financial dreams.
        </p>

      </div>

      {/* Statistics */}

      <GoalStats goals={goals} />

      {/* Goal Form */}

      <GoalForm
        onSave={handleSave}
        editingGoal={editingGoal}
        onCancel={handleCancel}
      />

      {/* Goals */}

      {goals.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

          <h2 className="text-2xl font-bold mb-2">
            No Goals Yet
          </h2>

          <p className="text-gray-500">
            Create your first financial goal to begin your savings journey.
          </p>

        </div>

      ) : (

        <div className="grid lg:grid-cols-2 gap-6">

          {goals.map((goal) => (

            <GoalCard
              key={goal._id}
              goal={goal}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddMoney={handleAddMoney}
            />

          ))}

        </div>

      )}

      {/* Add Money Modal */}

      {showAddMoneyModal && selectedGoal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">

            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  Add Money
                </h2>

                <p className="text-gray-500">
                  {selectedGoal.title}
                </p>

              </div>

              <button
                onClick={handleCloseAddMoneyModal}
                className="text-gray-500 hover:text-red-600 text-xl"
              >
                ✕
              </button>

            </div>

            <label className="block font-semibold mb-2">
              Amount
            </label>

            <input
              type="number"
              min="1"
              value={addMoneyAmount}
              onChange={(e) =>
                setAddMoneyAmount(e.target.value)
              }
              placeholder="Enter amount"
              className="w-full border rounded-xl p-3"
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={handleCloseAddMoneyModal}
                className="px-6 py-3 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAddMoney}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Money
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Goals;