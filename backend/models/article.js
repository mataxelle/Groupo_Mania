'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING,  // ou TEXT? car longueur
    attachement: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Article.belongsTo(models.User, {
          foreignKey: {    // La relation de la clé étrangère ne doit pas être null
            allowNull: false
          }
        })
      }
    }
  });
  return Article;
};