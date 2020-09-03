'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {   // Association du modèle User à d'autres modèles
        models.User.hasMany(models.Article);

        models.User.hasMany(models.Comment);
      }
    }
  });
  return User;
};