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
          briefing: `{"time":1623994461706,"blocks":[{"id":"HBC-KsjLLR","type":"paragraph","data":{"text":"브리핑"}},{"id":"6vHIwtQ9pd","type":"paragraph","data":{"text":"1"}},{"id":"PwNJFtEhQc","type":"paragraph","data":{"text":"2"}},{"id":"ztq1wOr3ks","type":"image","data":{"file":{"url":"https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/1623994459433.png","name":"1623994459433.png","size":324},"caption":"","withBorder":false,"stretched":false,"withBackground":false}}],"version":"2.22.0"}`,
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
          briefing: `{"time":1623994461706,"blocks":[{"id":"HBC-KsjLLR","type":"paragraph","data":{"text":"브리핑"}},{"id":"6vHIwtQ9pd","type":"paragraph","data":{"text":"1"}},{"id":"PwNJFtEhQc","type":"paragraph","data":{"text":"2"}},{"id":"ztq1wOr3ks","type":"image","data":{"file":{"url":"https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/1623994459433.png","name":"1623994459433.png","size":324},"caption":"","withBorder":false,"stretched":false,"withBackground":false}}],"version":"2.22.0"}`,
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
          briefing: `{"time":1623994461706,"blocks":[{"id":"HBC-KsjLLR","type":"paragraph","data":{"text":"브리핑"}},{"id":"6vHIwtQ9pd","type":"paragraph","data":{"text":"1"}},{"id":"PwNJFtEhQc","type":"paragraph","data":{"text":"2"}},{"id":"ztq1wOr3ks","type":"image","data":{"file":{"url":"https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/1623994459433.png","name":"1623994459433.png","size":324},"caption":"","withBorder":false,"stretched":false,"withBackground":false}}],"version":"2.22.0"}`,
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
