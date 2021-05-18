'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Invitations',
      [
        {
          email: '35c5610a5d-7d3714@inbox.mailtrap.io',
          name: 'desk100',
          state: 0,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          email: 'test100@naver.com',
          name: 'test100',
          state: 0,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          email: 'test101@naver.com',
          name: 'test101',
          state: 0,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
      ],
      { validate: false },
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Invitations');
  },
};  
