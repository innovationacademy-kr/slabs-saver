'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Authors', [
      {
        email: 'test1@naver.com',
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        email: 'test2@naver.com',
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        email: 'test3@naver.com',
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        email: 'test4@naver.com',
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      
    ], { validate: false });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
