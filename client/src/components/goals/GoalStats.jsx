const GoalStats = ({ goals }) => {
  const totalGoals = goals.length;

  const activeGoals = goals.filter(
    (goal) => goal.currentAmount < goal.targetAmount
  ).length;

  const completedGoals = goals.filter(
    (goal) => goal.currentAmount >= goal.targetAmount
  ).length;

  const totalSaved = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount),
    0
  );

  const stats = [
    {
      title: "Total Goals",
      value: totalGoals,
      color: "text-blue-600",
    },
    {
      title: "Active Goals",
      value: activeGoals,
      color: "text-yellow-600",
    },
    {
      title: "Completed",
      value: completedGoals,
      color: "text-green-600",
    },
    {
      title: "Total Saved",
      value: `₹${totalSaved.toLocaleString()}`,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
        >
          <p className="text-gray-500 text-sm">
            {item.title}
          </p>

          <h2
            className={`mt-3 text-3xl font-bold ${item.color}`}
          >
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default GoalStats;