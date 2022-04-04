const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REFRESH_URI
);

OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await OAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.FROM,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: process.env.FROM,
      to: process.env.TO,
      subject: "hello from gmail using API",
      text: "HEELLOOOO FROM GMAIL EMAIL USING API WORKING@!!!!!",
      html: "<h1>SUP AIDEN!</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err;
  }
}

sendMail()
  .then((result) => console.log("email sent...", result))
  .catch((error) => console.log(error.message));
