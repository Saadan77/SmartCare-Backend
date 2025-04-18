const nodemailer = require("nodemailer");

// Create a transporter using Gmail or SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saadanjawad50@gmail.com",
    pass: "wrqw aelr rltr fvxv",
  },
});

async function sendEmail(to, subject, htmlContent) {
  const mailOptions = {
    from: "saadanjawad50@gmail.com",
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
}

module.exports = { sendEmail };
