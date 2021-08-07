'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Subscribers', [
      {
      email: 'test1234@gmail.com',
      name: 'test1234',
      password:  '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
      createdAt: Sequelize.fn('now'),
      updatedAt: Sequelize.fn('now'),
      deletedAt : 1,
      followingCategories: '1,2,3,4,5',
      alarmStatus : 1,
    },
    {
      email: 'test2@gmail.com',
      name: 'test2',
      password:  '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
      createdAt: Sequelize.fn('now'),
      updatedAt: Sequelize.fn('now'),
      deletedAt : 1,
      followingCategories: '1,2,3,4,5',
      alarmStatus : 1,
    },
  
  ]);
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Subscribers');
  }
};
