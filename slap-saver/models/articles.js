'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Articles.init(
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
      publishTime: {
        type: DataTypes.DATE,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
      },
      am7: {
        type: DataTypes.BOOLEAN,
      },
      pm7: {
        type: DataTypes.BOOLEAN,
      },
      approve: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Articles',
    },
  );
  return Articles;
};
