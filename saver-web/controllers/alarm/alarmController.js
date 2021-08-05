const { Article, Alarm, Subscriber } = require('../../models');
const sequelize = require('../../models').sequelize;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const newAlarmRequest = async(req, res, next) => {

  const { articleId, category } = req.body;
  var categorynum;

  switch (category) {
    case '경제':
      categorynum = '1';
      break;
    case '정치':
      categorynum = '2';
      break;
    case '국제':
      categorynum = '3';
      break;
    case '사회':
      categorynum = '4';
      break;
    case '문화':
      categorynum = '5';
      break;
    default:
      categorynum = null;
  }

  const Users = await Subscriber.findAll({
    attributes: [ 'id' ],
     where:{
      followingCategories: {
          [Op.like]: "%" + categorynum + "%"
      }
    }
  });

  const newAlarmArray = (arr) => arr.map((user) => {
     const request = new Promise((resolve, reject) => {
       try {
         Alarm.create({
           UserId: user.id,
           ArticleId: articleId
         }).then(res => {
           resolve(res);
         });
       } 
       catch (error) {
         reject(error);
       }
     })
      return request;
   });


  try{    
    const requests = newAlarmArray(Users);
    await Promise.all(requests)
      .then((result) => {
        console.log("추가된 알림 개수 =", result.length);
      })
      .catch((err) => {
				console.log(err);
			})
  } 
  catch (error){
		console.log(error);
	}
    res.status(200).json({result: '알림 추가 완료'});
};

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
      ['createdAt', 'DESC'],
      ['Article', 'category', 'DESC'],
    ],
    offset: +page,
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
    delAlarm: deleteAlarmRequest,
    newAlarm: newAlarmRequest,
  },
  page: {
    Alarm: AlarmPage,
  }
};
