'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authentication extends Model {
    static associate(models) {
      // define association here
    }
  }
  Authentication.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isApproved: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Authentication',
    },
  );
  return Authentication;
};
