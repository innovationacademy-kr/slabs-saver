'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodayWord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Words }) {
      this.belongsTo(Words);
      // define association here
    }
  };
  TodayWord.init({
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TodayWord',
  });
  return TodayWord;
};
