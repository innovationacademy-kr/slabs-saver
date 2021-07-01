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
        type: Sequelize.INTEGER,
        allowNull: false,
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
        type: Sequelize.TEXT,
        allowNull: false,
      },
      am7: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      pm7: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      AuthorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'Authors',
          key: 'id',
        },
      },
      publishedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      paragraphs: {
        type: Sequelize.JSON,
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
