'use strict';

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    articleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Article',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isLike: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {

    models.User.belongsToMany(models.Article, {
      through: models.Like,
      foreignKey: 'userId',
      otherKey: 'articleId',
    });

    models.Article.belongsToMany(models.User, {
      through: models.Like,
      foreignKey: 'articleId',
      otherKey: 'userId',
    });

    models.Like.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.Like.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
    });
  };
  return Like;
};