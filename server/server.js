const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const transactionRoutes = require(
  "./routes/transactionRoutes"
);
const goalRoutes = require("./routes/goalRoutes");

const connectDB = require("./config/db");
const budgetRoutes = require("./routes/budgetRoutes");
const startMonthlyReportScheduler = require("./cron/monthlyReport");
dotenv.config();

connectDB();
startMonthlyReportScheduler();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/transactions", transactionRoutes);
app.get("/", (req, res) => {
  res.send("FinanceFlow Backend Running");
});
app.use("/api/goals", goalRoutes);
app.use("/api/budgets", budgetRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});