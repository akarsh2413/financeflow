const ReportFilters = ({
  month,
  year,
  setMonth,
  setYear,
  generateReport,
}) => {

  // Current year
  const currentYear = new Date().getFullYear();

  // Show current year + next 4 years
  const years = Array.from(
    { length: 5 },
    (_, index) => currentYear + index
  );

  const months = [
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
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-6">
        Generate Report
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {/* Month */}

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded-xl p-3"
        >
          <option value="">All Months</option>

          {months.map((m, index) => (
            <option
              key={index}
              value={index + 1}
            >
              {m}
            </option>
          ))}

        </select>

        {/* Year */}

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded-xl p-3"
        >
          <option value="">Select Year</option>

          {years.map((y) => (
            <option
              key={y}
              value={y}
            >
              {y}
            </option>
          ))}

        </select>

        {/* Button */}

        <button
          onClick={generateReport}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-200"
        >
          Generate Report
        </button>

      </div>

    </div>
  );
};

export default ReportFilters;