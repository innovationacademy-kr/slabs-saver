'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Words extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Author }) {
      this.belongsTo(Author);
      // define association here
    }
  };
  Words.init(
  {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
