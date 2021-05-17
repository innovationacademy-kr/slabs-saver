'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Authentications',
      [
        {
          email: 'desk@naver.com',
          name: 'desk',
          isApproved: 0,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
      ],
      { validate: false },
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authentications');
  },
};
