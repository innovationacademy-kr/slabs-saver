'use strict';
const moment = require('moment');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const date = moment().set('h', 0).set('m', '0').set('s', 0).format('YYYY-MM-DD');
		const date2 = moment().add(1, 'day').set('h', 0).set('m', '0').set('s', 0).format('YYYY-MM-DD');
		await queryInterface.bulkInsert(
			'TodayArticles',
			[
				{
					id: 1,
					ArticleId: 2,
					date: date,
					createdAt: Sequelize.fn('now'),
					updatedAt: Sequelize.fn('now'),
				},
				{
					id: 2,
					ArticleId: 3,
					date: date2,
					createdAt: Sequelize.fn('now'),
					updatedAt: Sequelize.fn('now'),
				},
			],
			{ validate: false },
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('TodayArticles');
	},
};
