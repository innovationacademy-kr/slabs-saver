'use strict';
const { Author } = require('../models');
const CATEGORY = require('../lib/constants/category');
const getRandomInt = require('../lib/getRandomInt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = await Author.findAll({});
    await Promise.all(
      authors.map(async (author) => {
        await author.createArticle({
          headline: 'economy article',
          category: CATEGORY.ECONOMY,
          image: 'fb15fbc7348eea8bfe0849096a31354f',
          imageDesc: 'this is image description',
          imageFrom: 'image source',
          briefing: 'this is briefing',
          status: getRandomInt(1, 4),
          paragraphs: JSON.stringify({ paragraphs: [] }),
        });
      }),
    );
    await Promise.all(
      authors.map(async (author) => {
        await author.createArticle({
          headline: 'politic article',
          category: CATEGORY.POLITIC,
          image: 'fb15fbc7348eea8bfe0849096a31354f',
          imageDesc: 'The Wuhan Institute of Virology.',
          imageFrom:
            'Photo: Hector Retamal/AFP via Getty Images The COVID lab-leak theory goes mainstream',
          briefing:
            'A group of high-profile scientists published a letter calling for renewed investigation into the origins of COVID-19 — including the theory that it spilled out of a virology lab',
          status: getRandomInt(1, 4),
          paragraphs: JSON.stringify({ paragraphs: [] }),
        });
      }),
    );
    await Promise.all(
      authors.map(async (author) => {
        await author.createArticle({
          headline: 'sports article',
          category: CATEGORY.SPORTS,
          image: 'fb15fbc7348eea8bfe0849096a31354f',
          imageDesc: 'this is image description',
          imageFrom: 'image source',
          briefing: 'this is briefing',
          status: getRandomInt(1, 4),
          paragraphs: JSON.stringify({ paragraphs: [] }),
        });
      }),
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles');
  },
};
