const axios = require("axios");

const sendEmail = async (to, subject, text) => {
  try {
    console.log("BREVO KEY:", process.env.BREVO_API_KEY?.substring(0, 15));
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "FinanceFlow",
          email: "chbbhc218@gmail.com", // your verified sender
        },
        to: [
          {
            email: to,
          },
        ],
        subject: subject,
        textContent: text,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("✅ Email sent successfully");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Brevo Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = sendEmail;