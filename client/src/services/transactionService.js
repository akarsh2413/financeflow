import api from "./api";

// Get Transactions
export const getTransactions = async (
  month,
  year
) => {
  const params = [];

  if (month !== undefined && month !== "") {
    params.push(`month=${month}`);
  }

  if (year !== undefined && year !== "") {
    params.push(`year=${year}`);
  }

  const queryString = params.length > 0 ? `?${params.join("&")}` : "";

  const response = await api.get(
    `/transactions${queryString}`
  );

  return response.data;
};

// Add Transaction
export const addTransaction = async (transactionData) => {
  const response = await api.post(
    "/transactions",
    transactionData
  );

  return response.data;
};

// Update Transaction
export const updateTransaction = async (
  id,
  transactionData
) => {
  const response = await api.put(
    `/transactions/${id}`,
    transactionData
  );

  return response.data;
};

// Delete Transaction
export const deleteTransaction = async (id) => {
  const response = await api.delete(
    `/transactions/${id}`
  );

  return response.data;
};