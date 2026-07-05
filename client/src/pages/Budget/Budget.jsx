import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import BudgetForm from "../../components/budget/BudgetForm";
import BudgetHistory from "../../components/budget/BudgetHistory";

import {
  saveBudget,
  getAllBudgets,
} from "../../services/budgetService";

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);

      const res = await getAllBudgets();

      setBudgets(res.budgets || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (budgetData) => {
    try {
      await saveBudget(budgetData);

      toast.success("Budget Saved Successfully");

      setSelectedBudget(null);

      fetchBudgets();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save budget"
      );
    }
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div>

        <h1 className="text-4xl font-bold">
          Monthly Budget
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your monthly budgets and keep your
          spending under control.
        </p>

      </div>

      {/* Budget Form */}

      <BudgetForm
        onSave={handleSave}
        selectedBudget={selectedBudget}
      />

      {/* Budget History */}

      {loading ? (
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

          Loading Budgets...

        </div>
      ) : (
        <BudgetHistory
          budgets={budgets}
          onSelect={setSelectedBudget}
        />
      )}

    </div>
  );
};

export default Budget;