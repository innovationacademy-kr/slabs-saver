'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Alarms', 
    [
      {
      UserId: 1,
      ArticleId: 126,
      createdAt: Sequelize.fn('now'),
      updatedAt: Sequelize.fn('now'),
      deleted: false,
      },
      {
        UserId: 1,
        ArticleId: 127,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
        deleted: false,
      },
      {
        UserId: 1,
        ArticleId: 128,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
        deleted: false,
      },
      {
        UserId: 1,
        ArticleId: 116,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
        deleted: false,
      },
      {
        UserId: 1,
        ArticleId: 117,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
        deleted: false,
      },
      {
        UserId: 1,
        ArticleId: 118,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
        deleted: false,
      },
      {
        UserId: 1,
        ArticleId: 119,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
        deleted: false,
      },
      {
        UserId: 1,
        ArticleId: 120,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
        deleted: false,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Alarms');
  }
};
