const cron = require("node-cron");

const User = require("../models/User");
const Budget = require("../models/Budget");

const generateMonthlyReport = require("../utils/reportGenerator");
const sendEmail = require("../utils/sendEmail");

const monthNames = [
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

const startMonthlyReportScheduler = () => {
  console.log("✅ Monthly Report Scheduler Started");

  // Runs at 11:59 PM on the last day of every month
  cron.schedule("59 23 28-31 * *", async () => {
    try {
      console.log("📧 Running Monthly Report Job...");

      const today = new Date();

      // Only continue if today is the last day of the month
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      if (tomorrow.getDate() !== 1) {
        return;
      }

      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const reportKey = `${year}-${month}`;

      const users = await User.find({
        isVerified: true,
      });

      console.log(`Found ${users.length} verified users`);

      for (const user of users) {
        try {
          // Prevent duplicate emails
          if (user.monthlyReportSent === reportKey) {
            continue;
          }

          console.log(`Generating report for ${user.email}`);

          const report = await generateMonthlyReport(
            user._id,
            month,
            year
          );

          let nextMonth = month + 1;
          let nextYear = year;

          if (nextMonth > 12) {
            nextMonth = 1;
            nextYear++;
          }

          const nextBudget = await Budget.findOne({
            user: user._id,
            month: nextMonth,
            year: nextYear,
          });

          const reminder = nextBudget
            ? `✅ Your budget for ${monthNames[nextMonth - 1]} ${nextYear} has already been created.`
            : `⚠️ You have not created a budget for ${monthNames[nextMonth - 1]} ${nextYear}. Please login to FinanceFlow and create one.`;

          const html = `
<div style="max-width:700px;margin:auto;padding:30px;font-family:Arial,sans-serif;background:#ffffff;border-radius:10px;">

<h1 style="color:#2563eb;">💰 FinanceFlow</h1>

<h2>Monthly Financial Report</h2>

<p>Hello <b>${user.name}</b>,</p>

<p>
Here is your financial summary for
<b>${monthNames[month - 1]} ${year}</b>.
</p>

<hr>

<table cellpadding="10" style="width:100%;border-collapse:collapse;">

<tr>
<td><b>Total Income</b></td>
<td>₹${report.income.toLocaleString()}</td>
</tr>

<tr>
<td><b>Total Expense</b></td>
<td>₹${report.expense.toLocaleString()}</td>
</tr>

<tr>
<td><b>Savings</b></td>
<td>₹${report.savings.toLocaleString()}</td>
</tr>

<tr>
<td><b>Budget</b></td>
<td>₹${report.budget.toLocaleString()}</td>
</tr>

<tr>
<td><b>Remaining Budget</b></td>
<td>₹${report.remainingBudget.toLocaleString()}</td>
</tr>

<tr>
<td><b>Budget Used</b></td>
<td>${report.budgetUsed}%</td>
</tr>

<tr>
<td><b>Total Transactions</b></td>
<td>${report.totalTransactions}</td>
</tr>

<tr>
<td><b>Highest Income</b></td>
<td>₹${report.highestIncome.toLocaleString()}</td>
</tr>

<tr>
<td><b>Highest Expense</b></td>
<td>₹${report.highestExpense.toLocaleString()}</td>
</tr>

<tr>
<td><b>Top Expense Category</b></td>
<td>${report.highestCategory} (₹${report.highestCategoryAmount.toLocaleString()})</td>
</tr>

</table>

<hr>

<h3 style="color:#2563eb;">Reminder</h3>

<p>${reminder}</p>

<br>

<p>
Thank you for using <b>FinanceFlow ❤️</b>
</p>

</div>
`;

          await sendEmail(
            user.email,
            `FinanceFlow Monthly Report - ${monthNames[month - 1]} ${year}`,
            "",
            html
          );

          // Mark report as sent for this month
          user.monthlyReportSent = reportKey;
          await user.save();

          console.log(`✅ Report sent to ${user.email}`);
        } catch (err) {
          console.log(`❌ Failed for ${user.email}`);
          console.log(err);
        }
      }
    } catch (error) {
      console.log("Scheduler Error:");
      console.log(error);
    }
  });
};

module.exports = startMonthlyReportScheduler;