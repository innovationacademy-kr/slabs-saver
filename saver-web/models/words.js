'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Words extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Author, TodayWord }) {
        console.log({ TodayWord});
      this.belongsTo(Author);
      this.hasOne(TodayWord)
      // define association here
    }
  };
  Words.init(
    {
      word: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
      ,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format('YYYY.MM.DD HH:mm:ss');
        },
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('updatedAt')).format('YYYY.MM.DD HH:mm:ss');
        },
      },
    },
    {
      sequelize,
      modelName: 'Words',
    });
  return Words;
};
