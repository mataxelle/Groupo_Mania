const jwt = require('jsonwebtoken'); // Créer et vérifier les token



module.exports = {
  parseAuthorization: function(authorization) {                                    // vérification que la chaîne de caract authorization est non null et
    return (authorization != null) ? authorization.replace('Bearer ', '') : null; // récupération du token
  },
  getUserId: function(authorization) {
    var userId = -1; // pour s'assurer qu'on ne fait pas des requêtes sur qqc qui n'existe pas
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {     // vérification si le token est diffetrent de null
      try {
        var jwtToken = jwt.verify(token, process.env.S_TOKEN);  // verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
}