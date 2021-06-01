const nodemailer = require('nodemailer');

module.exports = (invitationId, email, code) => {
  if (code != '0') {
    const myEmail = {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER_NAME,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
    const send = async (data) => {
      nodemailer.createTransport(myEmail).sendMail(data, function (error, info) {
        if (error) {
          console.error(error);
        } else {
          return info.response;
        }
      });
    };
    const content = {
      from: 'saver@saver.com',
      to: email,
      subject: 'saver입니다',
      html: `<h1>SAVER</h1><a href="">http://saver.42seoul.io/author/signup?id=${invitationId}</a>`,
    };
    send(content);
  }
};
