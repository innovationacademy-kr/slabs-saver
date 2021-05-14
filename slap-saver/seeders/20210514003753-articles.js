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
            image: 'a74dc438fb6834f35e6c7968b57ae25f',
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
