const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    const data = await resend.emails.send({
      from: "FinanceFlow <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      text: text,
    });

    console.log("✅ Email sent successfully");
    console.log(data);

    return data;
  } catch (err) {
    console.error("❌ Resend Error:", err);
    throw err;
  }
};

module.exports = sendEmail;