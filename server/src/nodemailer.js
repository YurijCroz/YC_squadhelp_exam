const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");

const { PORT, SMTP, AUTH } = CONSTANTS.NODEMAILER;

const transporter = nodemailer.createTransport(
  {
    host: SMTP,
    port: PORT,
    secure: false,
    auth: { ...AUTH },
  },
  {
    from: `Squadhelp <${AUTH.user}>`,
  }
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.error(err);
  });
};

module.exports = mailer;
