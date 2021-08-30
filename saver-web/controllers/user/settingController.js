const { Subscriber } = require('../../models');
const sequelize = require('../../models').sequelize;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sendContactMail = require('../../lib/sendContactMail');

const getSettingRequest = async (req, res) => {
  const user = await Subscriber.findAll({
    where: { id: req.decoded.userId },
    attributes: ['email', 'alarmStatus'],
  });
  try {
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      user,
    });
  }
};

const AlarmOnOffRequest = async (req, res) => {
  var flag = req.params.flag;
  try {
    const result = await Subscriber.update(
      { alarmStatus: flag },
      { where: { id: req.decoded.userId } },
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      error,
    });
  }
};

const postContactMail = async (req, res) => {
  try {
    await sendContactMail(
      req.body.title,
      `문의자 이메일: ${req.body.email}\n ---\n${req.body.contents}`,
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      succes: false,
      error,
    });
  }
};

module.exports = {
  section: (req, res, next) => {
    res.render('user/loginSetting', { title: 'slab-saver', layout: 'layout/userLayout' });
  },
  request: {
    getUser: getSettingRequest,
    OnOff: AlarmOnOffRequest,
  },
  postContactMail,
};
