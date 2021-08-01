'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Subscriber, Article }) {
      this.belongsTo(Subscriber, { foreignKey: 'UserId' });
      this.belongsTo(Article, { foreignKey: 'ArticleId' });
      // define association here
    }
  }
  Bookmark.init(
    {},
    {
      sequelize,
      modelName: 'Bookmarks',
    },
  );
  return Bookmark;
};
