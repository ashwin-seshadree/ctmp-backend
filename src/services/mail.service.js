const nodemailer = require("nodemailer");
const key = process.env.SENDGRID_API_KEY;
const sender = process.env.SENDGRID_SENDER_MAIL;

const transporter = nodemailer.createTransport({
  host: process.env.SENDGRID_HOST,
  port: process.env.SENDGRID_PORT,
  secure: false,
  auth: {
    user: process.env.SENDGRID_API_USER,
    pass: key,
  },
});

const sendMail = async (mailData) => {
  return new Promise(async (resolve, reject) => {
    mailData.from = sender;
    try {
      let data = await transporter.sendMail(mailData);
      resolve("Mail Sent Successfully");
    } catch (er) {
      console.log(er);
      reject("Mail Sending Failed");
    }
  });
};

module.exports = sendMail;
