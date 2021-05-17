'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Authors', [
      {
        email: 'desk@naver.com',
        name: 'desk',
        code: 2,
        desk: true,
        position: 2,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        email: 'test1@naver.com',
        name: 'test1',
        code: 201,
        desk: false,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        email: 'test2@naver.com',
        name: 'test2',
        code: 201,
        desk: false,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        email: 'test3@naver.com',
        name: 'test3',
        code: 201,
        desk: false,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        email: 'test4@naver.com',
        name: 'test4',
        code: 201,
        desk: false,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      
    ], { validate: false });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors');
  },
};
