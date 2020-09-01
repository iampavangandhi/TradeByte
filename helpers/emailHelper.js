// Email Helper Function

require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_ADDRESS,
    clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
    clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_OAUTH_ACCESS_TOKEN,
    expires: Number.parseInt(process.env.GMAIL_OAUTH_TOKEN_EXPIRE, 10),
  },
});

exports.sendEmail = (mailOptions) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error.stack || error);
        return reject(error);
      }
      resolve();
    });
  }).catch((error) => {
    console.log(error);
  });
