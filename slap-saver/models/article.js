const { Model } = require('sequelize');

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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      additionalParagraph: {
        type: DataTypes.STRING,
      },
      // NOTE: 출고 여부를 알려준다. 출고가 됐다는 것은 편집장의 최종 승인이 있었다는 것.
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
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
      // NOTE: 임시저장, 작성 완료의 여부를 확인한다.
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Article',
    },
  );

  return Article;
};
