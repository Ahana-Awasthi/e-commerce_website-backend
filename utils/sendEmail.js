const nodemailer = require("nodemailer");

// Replace with your real email credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your.email@gmail.com",
    pass: "your-app-password", // NOT your normal Gmail password; generate app password
  },
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: "your.email@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

module.exports = sendEmail;
