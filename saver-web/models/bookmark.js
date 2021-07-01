'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Subscriber,Article }) {
      this.belongsTo(Subscriber);
      this.belongsTo(Article);
      // define association here
    }
  };
  Bookmark.init({
    User_id: DataTypes.INTEGER,
    Article_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmarks',
  });
  return Bookmark;
};