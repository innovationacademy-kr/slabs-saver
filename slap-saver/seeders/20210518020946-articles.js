'use strict';
const { Author } = require('../models');
const CATEGORY = require('../lib/constants/category')
const getRandomInt = require('../lib/getRandomInt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = await Author.findAll({});
    await Promise.all(
      authors.map(async (author) => {
        await author.createArticle({
          headline: '경제 기사',
          category: CATEGORY.ECONOMY,
          author: author.name,
          image: 'a74dc438fb6834f35e6c7968b57ae25f',
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
          headline: '정치 기사',
          category: CATEGORY.POLITIC,
          author: author.email,
          image: '97579e23841e5530661bcf43dc4001f3',
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
          headline: '스포츠 기사',
          category: CATEGORY.SPORTS,
          author: author.name,
          image: 'a74dc438fb6834f35e6c7968b57ae25f',
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
