'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodayArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
	  static associate({ Article }) {
		this.belongsTo(Article)
    }
  };
  TodayArticle.init({
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TodayArticle',
  });
  return TodayArticle;
};