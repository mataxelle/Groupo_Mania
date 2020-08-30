'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
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
    commentaire: DataTypes.STRING
  }, {
    /*classMethods: {
      associate: function(models) {
        models.Comment.belongsTo(models.Article, {
          foreignKey: {    // La relation de la clé étrangère ne doit pas être null
            allowNull: false
          }
        })
      }
    }*/
  });
  Comment.associate = function(models) {

    /*models.User.belongsToMany(models.Article, {
      through: models.Comment,
      foreignKey: 'userId',
      otherKey: 'articleId',
    });

    models.Article.belongsToMany(models.User, {
      through: models.Comment,
      foreignKey: 'articleId',
      otherKey: 'userId',
    });*/

    models.Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.Comment.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
    });
  };
  return Comment;
};