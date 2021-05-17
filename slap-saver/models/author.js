'use strict';
require('dotenv').config();
const { Model } = require('sequelize');
const authorValidator = require('./validator/authorValidator');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Article }) {
      this.hasMany(Article);
    }

    validPassword(password) {
      return bcrypt.compare(password, this.password).then((result) => result);
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          customValidator(value) {
            authorValidator.code(value);
          },
        },
      },
      desk: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
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
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: '사진을 첨부해 주세요',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Author',
    },
  );

  Author.addHook('beforeCreate', async (author, options) => {
    const salt = await bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    return bcrypt.hash(author.password, salt).then((hash) => {
      author.password = hash;
      author.salt = salt;
    });
  });
  return Author;
};
