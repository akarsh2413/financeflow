const SibApiV3Sdk = require("@getbrevo/brevo");

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, text) => {
  try {
    const email = {
      sender: {
        name: "FinanceFlow",
        email: "chbbhc218@gmail.com",
      },
      to: [{ email: to }],
      subject: subject,
      textContent: text,
    };

    const response = await apiInstance.sendTransacEmail(email);

    console.log("✅ Email sent successfully");
    return response;
  } catch (err) {
    console.error("❌ Brevo Error:", err.response?.body || err);
    throw err;
  }
};

module.exports = sendEmail;