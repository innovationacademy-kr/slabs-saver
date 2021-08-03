const { Article, Alarm } = require('../../models');
const sequelize = require('../../models').sequelize;

const getAlarmRequest = async (req, res) => {
  const page = req.query.page;
  const alarm = await Alarm.findAll({
    where: { UserId: req.decoded.userId },
    include: [
      {
        model: Article,
        as: 'Article',
        attributes: [
          [sequelize.fn('date_format', sequelize.col('publishedAt'), '%Y.%m.%d'), 'date'],
          'category',
          'headline',
        ],
      },
    ],
    order: [
      [sequelize.fn('date_format', sequelize.col('Article.publishedAt'), '%Y.%m.%d'), 'DESC'],
      ['Article', 'category', 'DESC'],
      ['Article', 'publishedAt', 'DESC'],
    ],
    offset: page * 20,
    limit: 20,
  });
  try {
    res.status(200).json({
      alarm,
    });
  } catch (error) {
    res.status(400).json({
      alarm,
    });
  }
};

const AlarmPage = async (req, res) => {
  res.render('alarm/list', { user });
};

const checkAlarmRequest = async (req, res) => {
  const articleId = req.params.id;
  let result;
  try{
    const alarm = await Alarm.findAll({
      where: { UserId: req.decoded.userId, ArticleId: articleId },
    });

    if (Object.keys(alarm).length != 0) result = true;
    else result = false;

    res.status(200).json({
      success: true,
      result: result
    });
  } catch (error){
    res.status(400).json({
      success: false,
      error
    });
  }

}

const deleteAlarmRequest = async (req, res) => {
  const articleId = req.params.id;
  try{
    const result = await Alarm.update(
      {deleted: true},
      {where: { UserId: req.decoded.userId, ArticleId: articleId }}
    );
    
    res.status(200).json({
      success: true,
      result: result,
    });
  } catch (error){
    res.status(400).json({
      success: false,
      error
    });
  }
}

module.exports = {
  section: (req, res, next) => {
    res.render('user/alarm', { title: 'slab-saver', layout: 'layout/userLayout' });
  },
  request: {
    getAlarm: getAlarmRequest,
    checkAlarm: checkAlarmRequest,
    delAlarm: deleteAlarmRequest
  },
  page: {
    Alarm: AlarmPage,
  }
};
