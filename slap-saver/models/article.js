'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Author }) {
      this.belongsTo(Author);
      // define association here
    }
  }
  Article.init(
    {
      headline: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      imageDesc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageFrom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      briefing: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      additionalParagraph: {
        type: DataTypes.TEXT,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      am7: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      pm7: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Article',
    },
  );
  return Article;
};
