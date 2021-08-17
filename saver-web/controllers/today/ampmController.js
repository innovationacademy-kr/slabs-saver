const { Article, TodayArticle, Author } = require('../../models');
const STATUS = require('../../lib/constants/articleStatus');
const CATEGORY = require('../../lib/constants/category');
const moment = require('moment');
const {Op} = require('sequelize');
const converter = require('../../lib/converter');

/**
 * 오전 06:59 이전에는 어제 날짜
 * 오전 07:00 이후에는 오늘 날짜
 * YYYY-MM-DD
 * 실제 시간과는 다르지만 한국표준시와 UTC의 차이 때문에 offset만큼 빼준다.
 */
const getProperDate = () => {
    const offset = new Date().getTimezoneOffset() * 60000;
    const now = new Date();
    
    const h = now.getHours();
    if (h < 7) {
        now.setDate(now.getDate() - 1);
    }
    const real = new Date(now - offset);
    let date = real.toISOString();
    date = date.slice().slice(0, 10);
    console.log(date);
    return date;
};

/**
 * findOne()으로 찾은 가장 최근의 기사가 현재시각에 맞는 기사인지 검사.
 */
const getTodayAMPMAtricle = async (req, res) => {
    try {
        const articleRow = await Article.findOne({
            where: { 
                category : CATEGORY.AMPM, 
            },
            order: [['publishedAt', 'DESC']],
            include: {model: Author, attributes: ['photo', 'name']}
        });
        if (!articleRow) throw new Error('현재 생성된 AM7/PM7 기사가 없습니다.')
        const article = articleRow.dataValues;
        
        article.image = process.env.S3 + '/' + article.image;
        let category = articleRow.getDataValue('category');
        category = converter.categoryEng(category).toLocaleLowerCase();
        article.category = category;
        const publishedAt = moment(article.publishedAt);
        article.publishedAt = publishedAt.format('YYYY-MM-DD HH:mm:ss').slice(0, 16).replace(/\-/gi, '.');
        const now = moment();

        if (now.hours() >= 7 && now.hours() < 19){
            if (!publishedAt.isSame(moment('07:00', 'hh-mm'))) {
                throw new Error('현재 생성된 AM7 기사가 없습니다.');
            }
        }
        else if (now.hours() < 7){
            if (!publishedAt.isSame(moment('19:00', 'hh-mm').subtract(1, 'days'))){
                throw new Error('현재 생성된 PM7 기사가 없습니다.');
            }
        }
        else {
            if (!publishedAt.isSame(moment('19:00', 'hh-mm'))){
                throw new Error('현재 생성된 PM7 기사가 없습니다.');
            }
        }
        res.status(200).json({
            article
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message
        });
    }
}

const todayString = (isAM) => {
    const today = new Date();
    const header = isAM? 'AM7' : 'PM7';

    return (`[${header}] ${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`);
}

/**
 * am7: 전일 오후 5시 ~ 당일 오전 4시 59분 작성된 기사.
 * pm7: 당일 오전 5시 ~ 당일 오후 4시 59분 작성된 기사.
 * 시간 기준은 발행일
 */
const getAMPMArticleList = async(isAM) => {

    let amStandardTime = new Date();
    amStandardTime.setHours(5, 0, 0, 0);

    let pmStandardTime = new Date();
    pmStandardTime.setHours(17, 0, 0, 0);

    let articleList;
    if (isAM){
        pmStandardTime.setDate(pmStandardTime.getDate() - 1);
        articleList = await Article.findAll({
            where: {
                am7: true,
                publishedAt: {
                    [Op.lt]: amStandardTime,
                    [Op.gte]: pmStandardTime
                }
            },
            attributes: ['id', 'headline'],
        });
    } else {
        articleList = await Article.findAll({
            where: {
                pm7: true,
                publishedAt: {
                    [Op.gte]: amStandardTime,
                    [Op.lt]: pmStandardTime
                }
            },
            attributes: ['id', 'headline'],
        });
    }
    return articleList;
}

const getTodayArticle = async (date) => {
    const todayArticle = await TodayArticle.findOne({
        include: [{ model: Article, attributes: ['headline', 'id', 'image', 'imageDesc', 'imageFrom'] }],
        where: {
            date: new Date(date),
        },
    });
    return todayArticle;
}

const writeBriefing = (todayId, todayHeadline, articleList) => {
    var briefing = '<ul>';
    let idx = 1;
    if(todayId)
        briefing += `<li><a href="/articles/detail/${todayId}">${idx++}. ${todayHeadline}</a></li>`
    articleList.forEach((article) => {
        briefing += `<li><a href="/articles/detail/${article.id}">${idx++}. ${article.headline}</a></li>`;
    })
    briefing += '</ul>'
    return briefing;
}

const createAMPM = (isAM) => {
    const today = getProperDate();

    getTodayArticle(today)
    .then(async (res) =>{
        const articleList = await getAMPMArticleList(isAM);
        let firstArticle;
        if (!res){
            if (articleList[0] == null)
                throw new Error('표시할 기사가 없습니다.');
            firstArticle = await Article.findOne({
                where: {id: articleList[0].id},
            });
            articleList.shift();
        }
        else{
            firstArticle = res.Article;
        }
        const { headline, id, image, imageDesc, imageFrom } = firstArticle;
        const briefing = writeBriefing(id, headline, articleList);
        const date = new Date();

        Article.create({
            headline: todayString(isAM),
            category: 6,
            image: image,
            imageDesc: imageDesc,
            imageFrom: imageFrom,
            briefing: briefing,
            status: STATUS.CONFIRMED,
            paragraphs: '',
            AuthorId: 1,
            publishedAt: date,
        });
    })
    .catch((err) => { console.log(err); }) 
}

module.exports = {
    getTodayAMPMAtricle,
    createAMPM
}