'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Authors',
      [
        {
          email: 'author2@naver.com',
          name: 'author2',
          code: 201,
          position: 1,
          contact: '01012341234',
          password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
          photo: '0d948b18cc861228a65625ff96b5c4c7',
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          email: 'author3@naver.com',
          name: 'author3',
          code: 301,
          position: 1,
          contact: '01012341234',
          password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
          photo: '0d948b18cc861228a65625ff96b5c4c7',
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          email: 'author4@naver.com',
          name: 'author4',
          code: 401,
          position: 1,
          contact: '01012341234',
          password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
          photo: '0d948b18cc861228a65625ff96b5c4c7',
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          email: 'author5@naver.com',
          name: 'author5',
          code: 501,
          position: 1,
          contact: '01012341234',
          password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
          photo: '0d948b18cc861228a65625ff96b5c4c7',
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          email: 'author6@naver.com',
          name: 'author6',
          code: 601,
          position: 1,
          contact: '01012341234',
          password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
          photo: '0d948b18cc861228a65625ff96b5c4c7',
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          email: 'author7@naver.com',
          name: 'author7',
          code: 701,
          position: 1,
          contact: '01012341234',
          password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
          photo: '0d948b18cc861228a65625ff96b5c4c7',
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
        {
          email: 'author8@naver.com',
          name: 'author8',
          code: 801,
          position: 1,
          contact: '01012341234',
          password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
          photo: '0d948b18cc861228a65625ff96b5c4c7',
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
      ],
      { validate: false },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', {position: 1});
  },
};
