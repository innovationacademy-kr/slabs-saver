const moment = require('moment');
const { Article, Author, Subscriber } = require('../../models');
const converter = require('../../lib/converter');
const { subscribe } = require('../../routes');
const categories = require('../../public/javascripts/sectionCategory')

let currentFollowingStatus = [];



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

// [START] : 페이지 로딩 시, currentFollowStatus 초기화 작업 수행.
// 1. 새로 고침 시
const initFollowStatus = async (req, res, next) => {
    const { userId } = req.body
	currentFollowingStatus = [];
	try {
		const userFound = await Subscriber.findOne({ where : { id: userId } });
		if (userFound) {
			if (userFound.followingCategories)
				currentFollowingStatus = await userFound.followingCategories.split(',').map(x=>+x)
			else {
				currentFollowingStatus = [];
				await Subscriber.update({
					followingCategories: '',
				}, {
					where: { id: userId }
				})
			}
		}
    } catch (error) {
        console.log(error);
        res.status(400).json({
            result: false,
            message: `오류가 발생하였습니다 (${error.message})`,
        });
    }
};

// 2. 메뉴를 통해 화면에 들어갈 시.
const getSectionRequest = async (req, res) => {
	const userEmail = req.decoded.userEmail;
	const userId = req.decoded.userId;
	const userFound = await Subscriber.findOne({ where : { id: userId } });
	currentFollowingStatus = [];
	if (userFound.followingCategories)
	  currentFollowingStatus = await userFound.followingCategories.split(',').map(x=>+x)

	// response
	  res.status(200).json(userId);
  }
  // [END]


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
