import api from "./api";

// Save Budget
export const saveBudget = async (budgetData) => {
  const res = await api.post(
    "/budgets",
    budgetData
  );

  return res.data;
};

// Get Budget
export const getBudget = async (month, year) => {
  const res = await api.get(
    `/budgets?month=${month}&year=${year}`
  );

  return res.data;
};

// Get All Budgets
export const getAllBudgets = async () => {
  const res = await api.get(
    "/budgets/all"
  );

  return res.data;
};