'use strict';
const { Author } = require('../models');
const CATEGORY = require('../lib/constants/category');

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
          additionalParagraph: 'additional paragraph',
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
          additionalParagraph:
            'Driving the news: In the letter published Thursday in the journal Science, a group of prominent epidemiologists and biologists wrote "theories of accidental release from a lab and zoonotic spillover both remain viable."|-| \
          Flashback: A World Health Organization-led investigation in China earlier this year concluded a zoonotic spillover from an animal was "likely to very likely," while a lab leak of a human-made virus was dismissed as "extremely unlikely."|-| \
          The letter in Science, though, notes "the two theories were not given balanced consideration," with only four out of the report\'s 313 pages addressing the possibility of a laboratory accident.|-| \
          Between the lines: In a contentious exchange with Sen. Rand Paul this week, Anthony Fauci said he was "fully in favor of any further investigation of what went on in China," while denying the National Institutes of Health had funded any "gain of function" research in China\'s Wuhan Institute of Virology.|-| \
          Former New York Times science journalist Nicholas Wade raised more questions recently with a long article noting, among other things, the paucity of any clear evidence of a zoological spillover more than 16 months after the pandemic began.|-| \
          The bottom line: Given the Chinese government\'s opacity on the issue, we may never know the true origins of a virus that has killed millions of people.',
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
          additionalParagraph: 'additional paragraph',
        });
      }),
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles');
  },
};
