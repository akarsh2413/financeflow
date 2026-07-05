import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const getUserData = () => {
    try {
      const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const user = getUserData();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-slate-200">

      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-3 min-w-0">

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-2xl flex-shrink-0"
          >
            <FaBars />
          </button>

          <div className="min-w-0">

            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 truncate">
              Welcome, {user?.name || "User"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 truncate">
              {today}
            </p>

          </div>

        </div>

        {/* Right */}

        <button
          onClick={() => navigate("/profile")}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </button>

      </div>

    </header>
  );
};

export default Navbar;