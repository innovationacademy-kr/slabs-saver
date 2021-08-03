const moment = require('moment');
const { Article, Author, Subscriber } = require('../../models');
const converter = require('../../lib/converter');
const { subscribe } = require('../../routes');
const categories = require('../../public/javascripts/sectionCategory')

let currentFollowingStatus = [];

const getSectionRequest = async (req, res) => {
	 const userEmail = req.decoded.userEmail;
	 const userId = req.decoded.userId;

	console.log("userEmail =" + userEmail + "  userid = "+ userId);
	res.status(200).json(userId);
}

const sectionPage = (req, res, next) => {
	res.render('user/section', { title : 'slab-saver', layout: 'layout/userLayout'});
}

const loginedSection = (req, res, next) => {
	res.render('user/loginedSection', { title : 'slab-saver', layout: 'layout/userLayout'});
}

const updateFollowStatus = async (req, res, next) => {
    const { userId, followValue } = req.body;
    try {
        const userFound = await Subscriber.findOne({ userId: userId})
		if (userFound) {
			await Subscriber.update({
				followingCategories: userFound.followingCategories + followValue + ","
			}, {
				where: { id: userId}
			})
			const updatedUserFound = await Subscriber.findOne({ userId: userId})
			if (updatedUserFound.followingCategories)
				currentFollowingStatus = updatedUserFound.followingCategories.split(',')
			// await res.render('user/sectionFollowCategory',
			// 	{ title : 'slab-saver', layout: 'layout/userLayout', section: categories, follow: currentFollowingStatus });
			res.status(200).json({
				categories: categories,
				followStatus: currentFollowingStatus,
			})
		} else {
			res.status(400).json({
				result: false,
				message: 'user ID 오류가 발생하였습니다.',
			});
		}
    } catch (error) {
        console.log(error);
        res.status(400).json({
            result: false,
            message: `오류가 발생하였습니다 (${error.message})`,
        });
    }
};

const initFollowStatus = async (req, res, next) => {
    const { userId } = req.body
	try {
		const userFound = await Subscriber.findOne({ userId: userId})
		if (userFound) {
			if (userFound.followingCategories)
				currentFollowingStatus = await userFound.followingCategories.split(',')
		}
		await res.render('user/sectionFollowCategory',
			{ title : 'slab-saver', layout: 'layout/userLayout', section: categories, follow: currentFollowingStatus });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            result: false,
            message: `오류가 발생하였습니다 (${error.message})`,
        });
    }
};

const loginedPage = (req, res, next) => {
	res.render('user/sectionFollowCategory',
		{ title : 'slab-saver', layout: 'layout/userLayout', section: categories, follow: currentFollowingStatus });
}

module.exports = {
	request: {
		getSection: getSectionRequest,
		// insertSection: insertSectionRequest
		follow: updateFollowStatus,
		init: initFollowStatus,
	},
	page: {
		section: sectionPage,
		logined: loginedSection,
		loginedTest: loginedPage,
	},
};
