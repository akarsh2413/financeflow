import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getTransactions } from "../../services/transactionService";

const ExpenseChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadChartData();
  }, []);

  const loadChartData = async () => {
    try {
      const transactions =
        await getTransactions();

      const income = transactions
        .filter((item) => item.type === "Income")
        .reduce(
          (total, item) =>
            total + Number(item.amount),
          0
        );

      const expense = transactions
        .filter((item) => item.type === "Expense")
        .reduce(
          (total, item) =>
            total + Number(item.amount),
          0
        );

      setData([
        {
          name: "FinanceFlow",
          income,
          expense,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Income vs Expense
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="income"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="expense"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;