const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAILTRAP_API_TOKEN;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "chbbhc218@gmail.com",
  name: "FinanceFlow",
};

const sendEmail = async (to, subject, text) => {
  try {
    const response = await client.send({
      from: sender,
      to: [{ email: to }],
      subject,
      text,
    });

    console.log("✅ Email sent successfully");
    return response;
  } catch (error) {
    console.error("❌ Mailtrap Error:", error);
    throw error;
  }
};

module.exports = sendEmail;