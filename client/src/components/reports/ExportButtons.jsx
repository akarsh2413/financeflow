import generatePDF from "../../utils/pdfGenerator";
const ExportButtons = ({
  transactions = [],
  summary = {},
  month,
  year,
}) => {
  const downloadFile = (content, fileName, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    if (!transactions.length) return;

    const headers = ["Date", "Description", "Type", "Category", "Amount"];
    const rows = transactions.map((item) => {
      const rawDate = item.date || item.createdAt || item.transactionDate || "";
      const formattedDate = rawDate
        ? new Date(rawDate).toLocaleDateString("en-GB")
        : "";

      return [
        formattedDate,
        item.description || "",
        item.type || "",
        item.category || "",
        item.amount ?? "",
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    downloadFile(csvContent, "financial-report.csv", "text/csv;charset=utf-8;");
  };

  const exportToJSON = () => {
    if (!transactions.length) return;

    const payload = {
      exportedAt: new Date().toISOString(),
      summary,
      transactions,
    };

    downloadFile(
      JSON.stringify(payload, null, 2),
      "financial-report.json",
      "application/json"
    );
  };
  const exportToPDF = () => {
    if (!transactions.length) return;

    const user = JSON.parse(localStorage.getItem("user"));

    const monthName = month
      ? new Date(2026, Number(month) - 1).toLocaleString("default", {
        month: "long",
      })
      : "All Months";

    generatePDF({
      userName: user?.name || "FinanceFlow User",

      month: monthName,
      year: year || new Date().getFullYear(),

      totalIncome: summary.income,
      totalExpense: summary.expense,
      netSavings: summary.savings,

      transactions: transactions.map((item) => ({
        date: item.date || item.createdAt || item.transactionDate,
        description: item.description,
        type: item.type,
        category: item.category,
        amount: item.amount,
      })),
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={exportToCSV}
        disabled={!transactions.length}
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        Export CSV
      </button>
      <button
        type="button"
        onClick={exportToJSON}
        disabled={!transactions.length}
        className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Export JSON
      </button>
      <button
        type="button"
        onClick={exportToPDF}
        disabled={!transactions.length}
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
