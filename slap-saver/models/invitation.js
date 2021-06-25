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
      category: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isIn: [[0, 1, 2, 3, 4, 5, 6, 7, 8]],
        },
      },
      position: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
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
