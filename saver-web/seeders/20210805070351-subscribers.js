'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Subscribers', [{
      email: 'test1234@gmail.com',
      name: 'test1234',
      password: '$2b$10$fwjnP3FGKvGt/Caxs6q8Au/VWEh3ptD98zZsgJ5ZgKmuM89cR8D9a',
      createdAt: Sequelize.fn('now'),
      updatedAt: Sequelize.fn('now'),
      deletedAt : 1,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Subscribers');
  }
};
