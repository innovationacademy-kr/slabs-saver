'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Words',
			[
				{
					id: 1,
					AuthorId: 16,
					status: 3,
					word: '" 가장 빨리 맞을 수 있는 백신이 가장 좋은 백신 " - 감염내과 전문의 *** -',
					createdAt: Sequelize.fn('now'),
					updatedAt: Sequelize.fn('now'),
				},
				{
					id: 2,
					AuthorId: 16,
					status: 1,
					word: '손실보상법 국회 통과… 소급 적용 빠져',
					createdAt: Sequelize.fn('now'),
					updatedAt: Sequelize.fn('now'),
				},
				{
					id: 3,
					AuthorId: 16,
					status: 2,
					word: '코로나 대응에 모두가 지치고 힘든 지금, 서로가 서로를 격려하고 위로하는 마음의 방역이 필요한 시점입니다.',
					createdAt: Sequelize.fn('now'),
					updatedAt: Sequelize.fn('now'),
				},
			],
			{ validate: false },
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Words');
	},
};
