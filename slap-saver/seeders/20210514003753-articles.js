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
            image: 'b6781c46d6c102c20cf57394c4082bcc',
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
