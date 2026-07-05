import { useEffect, useState } from "react";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaPiggyBank,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import StatCard from "../../components/ui/StatCard";
import { getTransactions } from "../../services/transactionService";
import BudgetProgress from "./BudgetProgress";
import FinancialInsights from "./FinancialInsights";
import { getAllBudgets } from "../../services/budgetService";
import BudgetComparison from "./BudgetComparison";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {
  calculateSummary,
  getIncomeExpenseData,
  getCategoryData,
  getTrendData,
  getQuickStats,
} from "../../utils/dashboardUtils";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
const [selectedBudget, setSelectedBudget] = useState(null);
const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    savings: 0,
  });

  const currentDate = new Date();

  const [month, setMonth] = useState(
  sessionStorage.getItem("dashboardMonth") || ""
);

const [year, setYear] = useState(
  sessionStorage.getItem("dashboardYear") ||
    currentDate.getFullYear().toString()
);

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    filterDashboard();
  }, [transactions, budgets, month, year]);
  useEffect(() => {
  sessionStorage.setItem("dashboardMonth", month);
}, [month]);

useEffect(() => {
  sessionStorage.setItem("dashboardYear", year);
}, [year]);
 const fetchDashboard = async () => {
  setLoading(true);

  try {
    const transactionData = await getTransactions();

    const tx =
      transactionData?.transactions ??
      transactionData ??
      [];

    setTransactions(Array.isArray(tx) ? tx : []);

    const budgetData = await getAllBudgets();

    setBudgets(budgetData.budgets || []);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const filterDashboard = () => {
    let filtered = [...transactions];

    if (year) {
      filtered = filtered.filter((item) => {
        const date = new Date(item.date);
        return date.getFullYear() === Number(year);
      });
    }

    if (month !== "") {
      filtered = filtered.filter((item) => {
        const date = new Date(item.date);
        return date.getMonth() + 1 === Number(month);
      });
    }
setFilteredTransactions(filtered);

setSummary(calculateSummary(filtered));

let selected = null;

if (month !== "") {
  selected = budgets.find(
    (b) =>
      Number(b.month) === Number(month) &&
      Number(b.year) === Number(year)
  );
}

setSelectedBudget(selected);
  };

  const incomeExpenseData = getIncomeExpenseData(summary);
  const categoryData = getCategoryData(filteredTransactions);
  const monthlyData = getTrendData(filteredTransactions);
  const stats = getQuickStats(filteredTransactions);
  if (loading) {
  return (
    <LoadingSpinner text="Loading Dashboard..." />
  );
}

  return (
    <div className="space-y-6 lg:space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Monitor your finances month by month.
          </p>

        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <select
  value={month}
  onChange={(e) => {
    setMonth(e.target.value);
  }}
            className="border rounded-xl px-4 py-3 w-full sm:w-auto"
          >
            <option value="">
              All Months
            </option>

            {[
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
            ].map((m, index) => (
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
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-xl px-4 py-2"
          >
            {[2026, 2027, 2028, 2029, 2030].map((y) => (
              <option
                key={y}
                value={y}
              >
                {y}
              </option>
            ))}

          </select>

        </div>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Balance"
          amount={summary.balance}
          icon={<FaWallet />}
        />

        <StatCard
          title="Income"
          amount={summary.income}
          icon={<FaArrowUp />}
        />

        <StatCard
          title="Expense"
          amount={summary.expense}
          icon={<FaArrowDown />}
        />

        <StatCard
          title="Savings"
          amount={summary.savings}
          icon={<FaPiggyBank />}
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

          <h2 className="text-xl font-semibold mb-5">
            Income vs Expense
          </h2>

          <ResponsiveContainer width="100%" height={260}>

            <BarChart data={incomeExpenseData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="Income"
                fill="#22c55e"
              />

              <Bar
                dataKey="Expense"
                fill="#ef4444"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

          <h2 className="text-xl font-semibold mb-5">
            Transaction Trend
          </h2>

          <ResponsiveContainer width="100%" height={260}>

            <LineChart data={monthlyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Bottom */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

          <h2 className="text-xl font-semibold mb-5">
            Expense by Category
          </h2>

          <ResponsiveContainer width="100%" height={260}>

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >

                {categoryData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

          <h2 className="text-xl font-semibold mb-6">
            Quick Statistics
          </h2>

          <div className="space-y-5">

            <div className="border rounded-xl p-4">

              <p className="text-gray-500">
                Total Transactions
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold">
                {stats.totalTransactions}
              </h2>

            </div>

            <div className="border rounded-xl p-4">

              <p className="text-gray-500">
                Highest Income
              </p>

             <h2 className="text-xl sm:text-2xl font-bold text-green-600">
                ₹{stats.highestIncome}
              </h2>

            </div>

            <div className="border rounded-xl p-4">

              <p className="text-gray-500">
                Highest Expense
              </p>

              <h2 className="text-2xl font-bold text-red-600">
                ₹{stats.highestExpense}
              </h2>

            </div>

          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

  <BudgetProgress
    summary={summary}
    budget={selectedBudget}
  />

  <BudgetComparison
    summary={summary}
    budget={selectedBudget}
  />

</div>
      <FinancialInsights
        summary={summary}
        transactions={filteredTransactions}
      />

    </div>
  );
};

export default Dashboard;