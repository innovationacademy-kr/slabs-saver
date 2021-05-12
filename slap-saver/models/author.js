'use strict';

const { Model } = require('sequelize');
const authorValidator = require('./validator/authorValidator');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Author.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: '이미 존재하는 이메일입니다.',
        },
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            authorValidator.contact(value);
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            authorValidator.password(value);
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Author',
    },
  );
  return Author;
};
