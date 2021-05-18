const { Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Author }) {
      this.belongsTo(Author);
      // define association here
    }
  }
  Article.init(
    {
      headline: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
        },
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      imageDesc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageFrom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      briefing: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      additionalParagraph: {
        type: DataTypes.TEXT,
      },
      // NOTE: 출고 여부를 알려준다. 출고가 됐다는 것은 편집장의 최종 승인이 있었다는 것.
      // NOTE: am7, pm7 출고가 된 기사들만 체크를 할 수 있게 만들어야겠지?
      am7: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      pm7: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: 'Article',
    },
  );

  return Article;
};
