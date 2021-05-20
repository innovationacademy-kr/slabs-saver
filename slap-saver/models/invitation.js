'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    static associate(models) {
      // define association here
    }
  }
  Invitation.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: '이미 존재하는 이메일입니다.',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Invitation',
    },
  );
  return Invitation;
};
