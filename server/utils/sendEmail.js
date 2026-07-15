const nodemailer = require("nodemailer");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    const info = await transporter.sendMail({
      from: `"FinanceFlow" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

module.exports = sendEmail;