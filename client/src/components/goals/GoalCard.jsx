const GoalCard = ({
  goal,
  onEdit,
  onDelete,
  onAddMoney,
}) => {
  const progress = Math.min(
    (goal.currentAmount / goal.targetAmount) * 100,
    100
  );

  const remaining =
    goal.targetAmount - goal.currentAmount;

  const today = new Date();
  const targetDate = new Date(goal.targetDate);

  const daysRemaining = Math.ceil(
    (targetDate - today) / (1000 * 60 * 60 * 24)
  );

  const completed =
    goal.currentAmount >= goal.targetAmount;

  const overdue =
    !completed && daysRemaining < 0;

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition duration-300 p-6 border">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold">
            {goal.title}
          </h2>

          <p className="text-gray-500 mt-1">
            Target Date:
            {" "}
            {new Date(
              goal.targetDate
            ).toLocaleDateString()}
          </p>

        </div>

        {completed ? (

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            Completed
          </span>

        ) : overdue ? (

          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
            Overdue
          </span>

        ) : (

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            In Progress
          </span>

        )}

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="flex justify-between text-sm font-medium mb-2">

          <span>Progress</span>

          <span>{progress.toFixed(1)}%</span>

        </div>

        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              completed
                ? "bg-green-500"
                : "bg-blue-600"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Details */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div>

          <p className="text-gray-500 text-sm">
            Target Amount
          </p>

          <h3 className="font-bold text-lg">
            ₹{goal.targetAmount.toLocaleString()}
          </h3>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            Saved
          </p>

          <h3 className="font-bold text-lg text-green-600">
            ₹{goal.currentAmount.toLocaleString()}
          </h3>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            Remaining
          </p>

          <h3 className="font-bold text-lg text-red-600">
            ₹
            {Math.max(
              remaining,
              0
            ).toLocaleString()}
          </h3>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            Days Left
          </p>

          <h3 className="font-bold text-lg">
            {completed
              ? "Finished"
              : overdue
              ? "Expired"
              : `${daysRemaining} Days`}
          </h3>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex flex-wrap gap-3 mt-8">

        <button
          onClick={() => onAddMoney(goal)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          Add Money
        </button>

        <button
          onClick={() => onEdit(goal)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(goal._id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default GoalCard;