import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const linkClass = ({ isActive }) =>
    `block px-5 py-3 rounded-xl text-[15px] font-medium transition ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed lg:static top-0 left-0 z-50
        w-72 h-full min-h-screen bg-slate-900
        transform transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0
        flex flex-col
      `}
      >

        {/* Header */}

        <div className="px-8 py-8 border-b border-slate-800 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-white">
              FinanceFlow
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Personal Finance Manager
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-2xl lg:hidden"
          >
            <FaTimes />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 p-6 space-y-2">

          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={closeSidebar}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={linkClass}
            onClick={closeSidebar}
          >
            Transactions
          </NavLink>

          <NavLink
            to="/add-transaction"
            className={linkClass}
            onClick={closeSidebar}
          >
            Add Transaction
          </NavLink>

          <NavLink
            to="/goals"
            className={linkClass}
            onClick={closeSidebar}
          >
            Goals
          </NavLink>

          <NavLink
            to="/budget"
            className={linkClass}
            onClick={closeSidebar}
          >
            Budget
          </NavLink>

          <NavLink
            to="/reports"
            className={linkClass}
            onClick={closeSidebar}
          >
            Reports
          </NavLink>

          <NavLink
            to="/profile"
            className={linkClass}
            onClick={closeSidebar}
          >
            Profile
          </NavLink>

        </nav>

        {/* Footer */}

        <div className="px-8 py-6 border-t border-slate-800">

          <p className="text-xs text-slate-500">
            FinanceFlow v1.0
          </p>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;