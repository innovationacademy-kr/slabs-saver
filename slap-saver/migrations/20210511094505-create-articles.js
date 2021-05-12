'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      headline: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      imageDesc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageFrom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      briefing: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      additionalParagraph: {
        type: Sequelize.STRING,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
      },
      am7: {
        type: Sequelize.BOOLEAN,
      },
      pm7: {
        type: Sequelize.BOOLEAN,
      },
      state: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Articles');
  },
};
