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

const loginedPage = (req, res, next) => {
	res.render('user/loginedSection',
		{ title : 'slab-saver', layout: 'layout/userLayout', section: categories, follow: currentFollowingStatus });
}

// unfollow 기능
const destroyFollowStatus = async (req, res, next) => {
    const { userId, followValue } = req.body;
    try {
        const userFound = await Subscriber.findOne({ where: {id: userId } });
		if (userFound) {
			if (userFound.followingCategories)
			{
				currentFollowingStatus = userFound.followingCategories.split(',').map(x=>+x);
				let index = currentFollowingStatus.indexOf(followValue);
				if (index >= 0) // 찾았을 경우
					currentFollowingStatus.splice(index, 1);
				currentFollowingStatus.sort(function(a, b)  {
					if(a > b) return 1;
					if(a === b) return 0;
					if(a < b) return -1;
				});
			}
			await Subscriber.update({
				followingCategories: currentFollowingStatus.join()
			}, {
				where: {id: userId }
			})
			console.log(currentFollowingStatus);
			res.status(200).json({
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

// follow 기능
const updateFollowStatus = async (req, res, next) => {
    const { userId, followValue } = req.body;
    try {
        const userFound = await Subscriber.findOne({ where: { id: userId } });
		if (userFound) {
			if (userFound.followingCategories)
				currentFollowingStatus = userFound.followingCategories.split(',').map(x=>+x);
			if (currentFollowingStatus.indexOf(followValue) < 0) { // 기존에 없을 경우에만 추가
				currentFollowingStatus.push(followValue);
				currentFollowingStatus.sort(function(a, b)  {
					if(a > b) return 1;
					if(a === b) return 0;
					if(a < b) return -1;
				});
				await Subscriber.update({
					followingCategories: currentFollowingStatus.join()
				}, {
					where: { id: userId }
				})
			}
			res.status(200).json({
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

// 페이지 로딩 될 때, DB에서 처음으로 followStatus를 가져오는 작업
const initFollowStatus = async (req, res, next) => {
    const { userId } = req.body
	try {
		const userFound = await Subscriber.findOne({ where : { id: userId } });
		if (userFound) {
			if (userFound.followingCategories)
				currentFollowingStatus = await userFound.followingCategories.split(',').map(x=>+x)
		}
		await res.render('user/loginedSection',
			{ title : 'slab-saver', layout: 'layout/userLayout', section: categories, follow: currentFollowingStatus });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            result: false,
            message: `오류가 발생하였습니다 (${error.message})`,
        });
    }
};

module.exports = {
	request: {
		getSection: getSectionRequest,
		follow: updateFollowStatus,
		unfollow: destroyFollowStatus,
		init: initFollowStatus,
	},
	page: {
		section: sectionPage,
		logined: loginedPage,
	},
};
