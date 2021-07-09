const { Model } = require('sequelize');
const converter = require('../lib/converter');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Author, Bookmarks, TodayArticle }) {
      this.belongsTo(Author);
      this.hasMany(Bookmarks);
      this.hasOne(TodayArticle);
      // define association here
    }
  }
  Article.init(
    {
      headline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
          return converter.category(this.getDataValue('category'));
        },
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
        type: DataTypes.TEXT('long'),
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
		type: DataTypes.TEXT('long'),
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
