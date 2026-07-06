const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text = "", html = "") => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"FinanceFlow" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
    console.log(info);

    return info;
  } catch (error) {
    console.error("Email Error:", error);

    // IMPORTANT
    throw error;
  }
};

module.exports = sendEmail;