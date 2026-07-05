const nodemailer = require("nodemailer");

const sendEmail = async (
  to,
  subject,
  text = "",
  html = ""
) => {
  try {
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
    console.log(mailOptions);

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email Error:", error);
  }
};

module.exports = sendEmail;