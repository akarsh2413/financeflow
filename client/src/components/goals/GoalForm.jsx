import { useEffect, useState } from "react";

const GoalForm = ({
  onSave,
  editingGoal,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title,
        targetAmount: editingGoal.targetAmount,
        currentAmount: editingGoal.currentAmount,
        targetDate: editingGoal.targetDate
          ?.substring(0, 10),
      });
    }
  }, [editingGoal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      targetAmount: Number(formData.targetAmount),
      currentAmount: Number(formData.currentAmount),
    });

    setFormData({
      title: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        {editingGoal ? "Edit Goal" : "Create New Goal"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="title"
          placeholder="Goal Name"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="targetAmount"
          placeholder="Target Amount"
          value={formData.targetAmount}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="currentAmount"
          placeholder="Current Savings"
          value={formData.currentAmount}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="date"
          name="targetDate"
          value={formData.targetDate}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <div className="md:col-span-2 flex gap-3">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {editingGoal ? "Update Goal" : "Create Goal"}
          </button>

          {editingGoal && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
};

export default GoalForm;