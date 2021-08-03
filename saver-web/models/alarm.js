'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Alarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Article, Subscriber} ) {
      this.belongsTo(Subscriber, { foreignKey: 'UserId' });
      this.belongsTo(Article, { foreignKey: 'ArticleId' });
      // define association here
    }
  };
  Alarm.init({
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Alarm',
  });
  return Alarm;
};