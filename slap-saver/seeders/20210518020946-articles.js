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
          headline: '삼성 이건희 회장 유산 기부와 함께 생각해 볼 것들',
          category: CATEGORY.ECONOMY,
          image: 'article/6c815680098e50302d250552888b41cc',
          imageDesc: 'this is image description',
          imageFrom: 'image source',
          briefing: JSON.stringify({
            "time":1623994461706,
            "blocks":
              [{"id":"HBC-KsjLLR","type":"paragraph","data":{"text":"브리핑"}},
              {"id":"6vHIwtQ9pd","type":"paragraph","data":{"text":"1"}},
              {"id":"PwNJFtEhQc","type":"paragraph","data":{"text":"2"}},
              {"id":"ztq1wOr3ks","type":"image",
                "data":
                  {
                    "file":
                      {
                        "url":"https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/article/fded3c3db7c58c5e175460b953cffa84",
                        "name":"fded3c3db7c58c5e175460b953cffa84",
                        "size":324
                      },
                      "caption":"",
                      "withBorder":false,
                      "stretched":false,
                      "withBackground":false
                    }
                  }
                ],
                "version":"2.22.0"
              }),
          status: getRandomInt(1, 4),
          paragraphs: JSON.stringify({ paragraphs: [] }),
        });
      }),
    );
    await Promise.all(
      authors.map(async (author) => {
        await author.createArticle({
          headline: '6월 1일부터 시행되는 부동산 관련 제도',
          category: CATEGORY.POLITICS,
          image: 'article/fded3c3db7c58c5e175460b953cffa84',
          imageDesc: 'The Wuhan Institute of Virology.',
          imageFrom:
            'Photo: Hector Retamal/AFP via Getty Images The COVID lab-leak theory goes mainstream',
          briefing: JSON.stringify({
            "time":1623994461706,
            "blocks":
              [{"id":"HBC-KsjLLR","type":"paragraph","data":{"text":"브리핑"}},
              {"id":"6vHIwtQ9pd","type":"paragraph","data":{"text":"1"}},
              {"id":"PwNJFtEhQc","type":"paragraph","data":{"text":"2"}},
              {"id":"ztq1wOr3ks","type":"image",
                "data":
                  {
                    "file":
                      {
                        "url":"https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/article/fded3c3db7c58c5e175460b953cffa84",
                        "name":"fded3c3db7c58c5e175460b953cffa84",
                        "size":324
                      },
                      "caption":"",
                      "withBorder":false,
                      "stretched":false,
                      "withBackground":false
                    }
                  }
                ],
                "version":"2.22.0"
              }),
          status: getRandomInt(1, 4),
          paragraphs: JSON.stringify({ paragraphs: [] }),
        });
      }),
    );
    await Promise.all(
      authors.map(async (author) => {
        await author.createArticle({
          headline: 'social article',
          category: CATEGORY.SOCIAL,
          image: 'article/1624002044422.jpg',
          imageDesc: 'this is image description',
          imageFrom: 'image source',
          briefing: JSON.stringify({
            "time":1623994461706,
            "blocks":
              [{"id":"HBC-KsjLLR","type":"paragraph","data":{"text":"브리핑"}},
              {"id":"6vHIwtQ9pd","type":"paragraph","data":{"text":"1"}},
              {"id":"PwNJFtEhQc","type":"paragraph","data":{"text":"2"}},
              {"id":"ztq1wOr3ks","type":"image",
                "data":
                  {
                    "file":
                      {
                        "url":"https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/article/fded3c3db7c58c5e175460b953cffa84",
                        "name":"fded3c3db7c58c5e175460b953cffa84",
                        "size":324
                      },
                      "caption":"",
                      "withBorder":false,
                      "stretched":false,
                      "withBackground":false
                    }
                  }
                ],
                "version":"2.22.0"
              }),
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
