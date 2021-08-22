const getCurrentUser = require('../../../lib/getCurrentUser');
const { Author, Article, TodayArticle } = require('../../../models');
const moment = require('moment');
const POSITION = require('../../../lib/constants/position');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getTodayArticle = async (date) => {
    let todayArticle = (
        await Article.findOne({
            include: [{ 
                model: TodayArticle,
                where: {
                    date: new Date(date)
                },
                attributes: ['ArticleId']
            },
            {
                model: Author,
                attributes: ['name']
            }
        ],
        attributes: ['headline', 'id', 'publishedAt'] ,
        })
    );

    if (todayArticle != null) {
        todayArticle = todayArticle.get({ plain: true });
        todayArticle.headline = escape(todayArticle.headline);
    }

    return todayArticle;
};

/**
 * 입력한 날짜에 따라 생성될 am/pm기사를 보여준다.
 * req.query.date = yyyy-mm-dd 형식
 */
const ampmPageDesking = async (req, res) => {
    const currentUser = await getCurrentUser(req.user.id);
    let date = req.query.date;
    if (date == null){
        date = moment().format('YYYY-MM-DD');
    }

    const todayArticle = await getTodayArticle(date);
    let ampm = req.query.ampm;
    if (ampm == null){
        ampm = 'am7'
    }

    if (ampm === 'am7'){
        date += ' 07:00';
    } else if (ampm === 'pm7') {
        date += ' 19:00'
    }
    let startStandard = moment(date).subtract(14, 'hours');
    let endStandard = moment(date).subtract(2, 'hours');
    
    let articles;
    if (ampm === 'am7'){
        articles = await Article.findAll({
            attributes: ['id', 'headline', 'publishedAt'],
            where: {
                am7: true,
                publishedAt: {
                    [Op.gte]: startStandard,
                    [Op.lt]: endStandard
                }
            },
            include: [
            {
                model: Author,
                attributes: ['id', 'name'],
            },
            ],
        });
    } else if(ampm === 'pm7') {
        articles = await Article.findAll({
            attributes: ['id', 'headline', 'publishedAt'],
            where: {
                pm7: true,
                publishedAt: {
                    [Op.gte]: startStandard,
                    [Op.lt]: endStandard
                }
            },
            include: [
            {
                model: Author,
                attributes: ['id', 'name'],
            },
            ]
        });
    }

    articles = articles.map((article) => {
        article = article.get({ plain: true });
        article.headline = escape(article.headline);
        console.log(article);
        return article;
    });

    res.render('author/ampm/ampm', {
        layout: 'layout/adminLayout',
        currentUser,
        date,
        POSITION,
        articles,
        todayArticle,
        ampm
    });
};

module.exports = {
    page: { ampmPageDesking }
}