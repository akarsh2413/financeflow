const budgetAlertTemplate = (
  name,
  budget,
  spent,
  exceeded
) => {
  const percentage = ((spent / budget) * 100).toFixed(1);

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>FinanceFlow Budget Alert</title>
</head>

<body style="
margin:0;
padding:0;
background:#f4f7fb;
font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table
width="600"
style="
background:#ffffff;
margin-top:30px;
border-radius:12px;
overflow:hidden;
box-shadow:0 5px 20px rgba(0,0,0,.08);">

<!-- Header -->

<tr>
<td
style="
background:#2563eb;
padding:30px;
text-align:center;
color:white;">

<h1 style="margin:0;">
💰 FinanceFlow
</h1>

<p style="margin-top:10px;">
Your Personal Finance Manager
</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:35px;">

<h2 style="color:#dc2626;">
⚠ Monthly Budget Exceeded
</h2>

<p>
Hello <strong>${name}</strong>,
</p>

<p>
You have exceeded your monthly spending budget.
Please review your recent expenses.
</p>

<hr>

<table width="100%" cellpadding="8">

<tr>
<td><strong>Monthly Budget</strong></td>
<td align="right">
₹${budget.toLocaleString()}
</td>
</tr>

<tr>
<td><strong>Total Spent</strong></td>
<td align="right">
₹${spent.toLocaleString()}
</td>
</tr>

<tr>
<td><strong>Exceeded By</strong></td>
<td
align="right"
style="color:red;font-weight:bold;">
₹${exceeded.toLocaleString()}
</td>
</tr>

<tr>
<td><strong>Budget Usage</strong></td>
<td align="right">
${percentage}%
</td>
</tr>

</table>

<br>

<div
style="
background:#fff3cd;
padding:15px;
border-left:5px solid orange;
border-radius:8px;">

💡 <strong>Financial Tips</strong>

<ul>
<li>Review unnecessary expenses.</li>
<li>Track spending daily.</li>
<li>Set savings goals.</li>
<li>Avoid impulse purchases.</li>
</ul>

</div>

<br>

<div
style="
background:#fee2e2;
padding:15px;
border-radius:8px;
color:#b91c1c;">

🚨 You have crossed your monthly budget.

</div>

</td>
</tr>

<!-- Footer -->

<tr>
<td
style="
background:#f3f4f6;
padding:20px;
text-align:center;
font-size:13px;
color:#666;">

Thank you for choosing
<strong>FinanceFlow</strong>

<br><br>

© 2026 FinanceFlow

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

module.exports = budgetAlertTemplate;