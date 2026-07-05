const GoalProgress = ({ currentAmount, targetAmount }) => {
  const progress =
    targetAmount > 0
      ? Math.min((currentAmount / targetAmount) * 100, 100)
      : 0;

  const getProgressColor = () => {
    if (progress >= 100) return "bg-green-600";
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-600";
  };

  return (
    <div className="space-y-2">

      <div className="flex justify-between text-sm">

        <span className="font-medium">
          ₹{currentAmount.toLocaleString()}
        </span>

        <span className="text-gray-500">
          ₹{targetAmount.toLocaleString()}
        </span>

      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

        <div
          className={`${getProgressColor()} h-full transition-all duration-500`}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="flex justify-between text-sm">

        <span className="font-semibold">
          {progress.toFixed(0)}% Completed
        </span>

        <span
          className={`font-semibold ${
            progress >= 100
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {progress >= 100
            ? "Goal Achieved 🎉"
            : "In Progress"}
        </span>

      </div>

    </div>
  );
};

export default GoalProgress;