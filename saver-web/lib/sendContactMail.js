const nodemailer = require('nodemailer');

module.exports = async (title, contents) => {
  const myEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CONTACT_USER_NAME,
      pass: process.env.CONTACT_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await myEmail.sendMail(
    {
      from: `${process.env.CONTACT_USER_NAME}`,
      to: `${process.env.CONTACT_USER_NAME}`,
      subject: title,
      text: contents,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return info.response;
      }
    },
  );
};
