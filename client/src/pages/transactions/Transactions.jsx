import { useEffect, useState } from "react";
import TransactionTable from "../../components/ui/TransactionTable";
import { getTransactions } from "../../services/transactionService";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
const Transactions = () => {
  const currentDate = new Date();

  const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(
    currentDate.getMonth() + 1
  );

  const [year, setYear] = useState(
    currentDate.getFullYear()
  );

  useEffect(() => {
    fetchTransactions();
  }, [month, year]);

 const fetchTransactions = async () => {
  setLoading(true);

  try {
    const data = await getTransactions(month, year);
    setTransactions(data.transactions);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

if (loading) {
  return <LoadingSpinner text="Loading Transactions..." />;
}

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          All Transactions
        </h1>

        <div className="flex gap-3">
          <select
            value={month}
            onChange={(e) =>
              setMonth(Number(e.target.value))
            }
            className="border rounded-lg px-4 py-2"
          >
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
            onChange={(e) =>
              setYear(Number(e.target.value))
            }
            className="border rounded-lg px-4 py-2"
          >
            {Array.from(
              { length: 6 },
              (_, i) => currentDate.getFullYear() - 2 + i
            ).map((yr) => (
              <option
                key={yr}
                value={yr}
              >
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TransactionTable
        transactions={transactions}
        refreshTransactions={fetchTransactions}
      />
    </div>
  );
};

export default Transactions;