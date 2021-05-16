'use strict';
const { Author } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = await Author.findAll({});
    await Promise.all(
      authors.map(async (author) => {
        await author.createArticle({
          headline: `article from ${author.email}`,
          category: 'politic',
          author: author.email,
          image: '97579e23841e5530661bcf43dc4001f3',
          imageDesc: 'this is image description',
          imageFrom: 'image source',
          briefing: 'this is briefing',
          additionalParagraph: 'additional paragraph',
        });
      }),
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles');
  },
};
