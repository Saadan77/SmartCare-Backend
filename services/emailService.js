const nodemailer = require("nodemailer");

// Create a transporter using Gmail or SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saadanjawad50@gmail.com",
    pass: "wrqw aelr rltr fvxv",
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "saadanjawad50@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = { sendEmail };
