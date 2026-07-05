const express = require("express");
const router = express.Router();

const sendEmail = require("../utils/sendEmail");

router.get("/send-test-email", async (req, res) => {
  try {
    await sendEmail(
      process.env.EMAIL_USER,
      "FinanceFlow Test",
      "Congratulations! Nodemailer is working successfully."
    );

    res.json({
      success: true,
      message: "Test email sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

module.exports = router;