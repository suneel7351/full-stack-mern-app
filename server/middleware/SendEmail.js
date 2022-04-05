const nodemailer = require("nodemailer");
require("dotenv").config({ path: "/config/.env" });
async function sendEmail(options) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    service: process.env.MAIL_SERVICE,
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
}

module.exports = sendEmail;
