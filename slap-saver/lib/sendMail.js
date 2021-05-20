const nodemailer = require('nodemailer');

module.exports = (invitationId, email, code) => {
  if (code != '0') {
    const myEmail = {
      host: process.env.MAILTRAP_HOST,
      port: 2525,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USER_NAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    };
    const send = async (data) => {
      nodemailer.createTransport(myEmail).sendMail(data, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return info.response;
        }
      });
    };
    const content = {
      from: 'saver@saver.com',
      to: email,
      subject: 'saver입니다',
      html: `<h1>SAVER</h1><a href="">http://localhost:4000/author/signup?id=${invitationId}</a>`,
    };
    send(content);
  }
};
