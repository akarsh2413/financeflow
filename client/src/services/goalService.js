import api from "./api";

// Create Goal
export const createGoal = async (goalData) => {
  const response = await api.post("/goals", goalData);

  return response.data;
};

// Get All Goals
export const getGoals = async () => {
  const response = await api.get("/goals");

  return response.data;
};

// Update Goal
export const updateGoal = async (id, goalData) => {
  const response = await api.put(`/goals/${id}`, goalData);

  return response.data;
};

// Delete Goal
export const deleteGoal = async (id) => {
  const response = await api.delete(`/goals/${id}`);

  return response.data;
};

// Add Money
export const addMoney = async (id, amount) => {
  const response = await api.patch(
    `/goals/${id}/add-money`,
    { amount }
  );

  return response.data;
};