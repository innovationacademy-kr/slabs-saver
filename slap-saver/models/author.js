'use strict';
require('dotenv').config();
const { Model } = require('sequelize');
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
          isIn: [[1, 2, 3, 4, 5, 6, 7, 8, 201, 301, 401, 501, 601, 701, 801]],
        },
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
          is: /^\d{11}$/i,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/i,
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
