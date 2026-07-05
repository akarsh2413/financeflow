import { Link } from "react-router-dom";
import {
  FaWallet,
  FaChartLine,
  FaBullseye,
} from "react-icons/fa";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">
          FinanceFlow
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <div>
          <h1 className="text-5xl font-extrabold text-slate-800 leading-tight">
            Take Control of
            <span className="text-blue-600">
              {" "}Your Finances
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            FinanceFlow helps you manage your income,
            expenses, savings, and financial goals with
            beautiful charts and a secure dashboard.
          </p>

          <div className="mt-10 flex gap-5">

            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>

          </div>

          <p className="mt-5 text-gray-500">
            New user? Click
            <span className="font-semibold text-blue-600">
              {" "}Get Started
            </span>{" "}
            to create your account.
          </p>
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <div className="space-y-8">

            <div className="flex items-center gap-5">
              <FaWallet className="text-5xl text-green-500" />

              <div>
                <h2 className="text-xl font-bold">
                  Track Every Expense
                </h2>

                <p className="text-gray-500">
                  Never lose track of your spending.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaChartLine className="text-5xl text-blue-500" />

              <div>
                <h2 className="text-xl font-bold">
                  Smart Analytics
                </h2>

                <p className="text-gray-500">
                  Visual charts for better decisions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaBullseye className="text-5xl text-red-500" />

              <div>
                <h2 className="text-xl font-bold">
                  Savings Goals
                </h2>

                <p className="text-gray-500">
                  Achieve your financial dreams faster.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-center text-white py-6">
        <p>
          © 2026 FinanceFlow. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
};

export default Landing;