'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Invitations', [
      {
        email: '35c5610a5d-7d3714@inbox.mailtrap.io',
        name: 'desk100',
        state: 0,
        code: 2,
        category: 2,
        position: 2,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        email: 'test100@naver.com',
        name: 'test100',
        state: 0,
        code: 2,
        category: 2,
        position: 1,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        email: 'test101@naver.com',
        name: 'test101',
        state: 0,
        code: 1,
        category: 1,
        position: 1,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Invitations');
  },
};
