'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Authors',
      [
        {
          email: 'chief@naver.com',
          name: 'chief',
          code: 1,
          position: 3,
          category: 1,
          contact: '01012341234',
          password: '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
          photo: 'chief',
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
        },
      ],
      { validate: false },
    );
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Authors', {position: 3});
  }
};
