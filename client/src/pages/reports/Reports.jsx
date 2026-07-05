import { useEffect, useState } from "react";

import ReportFilters from "../../components/reports/ReportFilters";
import ReportSummary from "../../components/reports/ReportSummary";
import ExpenseBreakdown from "../../components/reports/ExpenseBreakdown";
import ExportButtons from "../../components/reports/ExportButtons";
import { getTransactions } from "../../services/transactionService";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {
  generateExpenseBreakdown,
  generateSummary,
} from "../../utils/reportUtils";

const Reports = () => {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    savings: 0,
    transactions: 0,
  });

  const [expenseBreakdown, setExpenseBreakdown] = useState([]);

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
  setLoading(true);

  try {
    const data = await getTransactions();

    const tx = data?.transactions ?? data ?? [];

    const txList = Array.isArray(tx) ? tx : [];

    setTransactions(txList);
    setFilteredTransactions(txList);

    setSummary(generateSummary(txList));
    setExpenseBreakdown(generateExpenseBreakdown(txList));

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const generateReport = () => {

    if (!month || !year) {

      setFilteredTransactions(transactions);

      setSummary(generateSummary(transactions));
      setExpenseBreakdown(generateExpenseBreakdown(transactions));

      return;
    }

    const filtered = transactions.filter((transaction) => {

      const date = new Date(
  transaction.date ||
  transaction.createdAt ||
  transaction.transactionDate
);

      return (
        date.getMonth() + 1 === Number(month) &&
        date.getFullYear() === Number(year)
      );
    });

    setFilteredTransactions(filtered);

    setSummary(generateSummary(filtered));
    setExpenseBreakdown(
  generateExpenseBreakdown(filtered)
);
  };if (loading) {
  return (
    <LoadingSpinner text="Loading Reports..." />
  );
}

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Financial Reports
        </h1>

        <p className="text-gray-500 mt-2">
          Analyze your financial performance month by month.
        </p>

      </div>

      <ReportFilters
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        generateReport={generateReport}
      />

      <ExportButtons
  transactions={filteredTransactions}
  summary={summary}
  month={month}
  year={year}
/>
      <ReportSummary summary={summary} />
      <ExpenseBreakdown breakdown={expenseBreakdown} />

    </div>
  );
};

export default Reports;