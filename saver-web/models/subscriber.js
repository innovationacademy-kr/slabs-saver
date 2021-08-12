'use strict';
require('dotenv').config();
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bookmarks }) {
      this.hasMany(Bookmarks, { foreignKey: 'UserId' });
    }
    validPassword(password) {
      return bcrypt.compare(password, this.password).then((result) => result);
    }
  };

  Subscriber.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: '이미 존재하는 이메일입니다.',
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/i,
      },
    },
    deletedAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followingCategories: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alarmStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, 
  {
    sequelize,
    modelName: 'Subscriber',
  }
  );

  Subscriber.addHook('beforeCreate', async (subscriber, options) => {
    const salt = await bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    return bcrypt.hash(subscriber.password, salt).then((hash) => {
      subscriber.password = hash;
      subscriber.salt = salt;
    });
  });
  return Subscriber;
};
