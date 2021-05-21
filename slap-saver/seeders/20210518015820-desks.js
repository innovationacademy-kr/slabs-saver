'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Authors', [
      {
        email: 'desk2@naver.com',
        name: 'desk2',
        code: 2,
        position: 2,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        email: 'desk3@naver.com',
        name: 'desk3',
        code: 3,
        position: 2,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        email: 'desk4@naver.com',
        name: 'desk4',
        code: 4,
        position: 2,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        email: 'desk5@naver.com',
        name: 'desk5',
        code: 5,
        position: 2,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        email: 'desk6@naver.com',
        name: 'desk6',
        code: 6,
        position: 2,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        email: 'desk7@naver.com',
        name: 'desk7',
        code: 7,
        position: 2,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDskXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        email: 'desk8@naver.com',
        name: 'desk8',
        code: 8,
        position: 2,
        contact: '01012341234',
        password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
        photo: '0d948b18cc861228a65625ff96b5c4c7',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Authors', { position: 2 });
  },
};
