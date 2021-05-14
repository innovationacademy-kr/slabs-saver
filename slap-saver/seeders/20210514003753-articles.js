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
            image: '87e3d1cfb2dd20d99b14e527f6996fb3',
            imageDesc: 'this is image description',
            imageFrom: 'image source',
            briefing: 'this is briefing',
            additionalParagraph: 'additional paragraph',
          })
        })
      );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles');
  }
};
