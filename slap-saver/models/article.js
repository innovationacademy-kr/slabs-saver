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
      publishedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('publishedAt')).format('YYYY.MM.DD HH:mm:ss');
        },
      },
      paragraphs: {
        type: DataTypes.JSON,
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

  Article.addHook('beforeUpdate', async (article, options) => {
    const currentStatus = article._previousDataValues.status;
    const afterStatus = article.dataValues.status;
    if (currentStatus === 3 && afterStatus === 4) {
      article.publishedAt = Date.now();
    } else if (currentStatus === 4 && afterStatus === 3) {
      article.publishedAt = null;
    }
    // TODO: 이 부분에서 조금 문제 있는듯
    const currentImage = article._previousDataValues.image;
    if (article.dataValues.image === '') {
      article.image = currentImage;
    }
  });
  return Article;
};
