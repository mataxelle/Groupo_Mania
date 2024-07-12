'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      title: DataTypes.STRING,
      text: DataTypes.STRING, // ou TEXT? car longueur
      attachement: DataTypes.STRING,
      likes: DataTypes.INTEGER,
    },
    {}
  );

  Article.associate = function (models) {
    models.Article.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.Article.hasMany(models.Comment, {
      foreignKey: 'articleId',
      as: 'comments',
    });
  };
  return Article;
};
