const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const models = require('../models'); // Va chercher tous les models définies avec siquelize
const asyncL = require('async');



const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{7,12}$/;



////////////////// Create User  /////////////////////////////

exports.signup = (req, res) => {

  var firstName = req.body.firstName;   
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;

  if (!firstName) {
    console.log('fn manquant')
    return res.status(400).json({ error: 'Certains champs sont manquants !' });
  };
  if (!lastName) {
    console.log('ln manquant')
    return res.status(400).json({ error: 'Certains champs sont manquants !' });
  };
  if (!email) {
    console.log('email manquant')
    return res.status(400).json({ error: 'Certains champs sont manquants !' });
  };
  if (!password) {
    console.log('pw manquant')
    return res.status(400).json({ error: 'Certains champs sont manquants !' });
  };

  if (firstName.length <= 1 || firstName.length >= 20) {
    return res.status(400).json({ error: 'Votre prénom doit avoir entre 2 et 19 Caractères !' });
  };

  if (lastName.length <= 1 || lastName.length >= 20) {
    return res.status(400).json({ error: 'Votre nom doit avoir entre 2 et 19 Caractères !' });
  };

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: ' Adresse email non valide!' });
  }

  /*if (!PASSWORD_REGEX.test.password) {
    return res.status(400).json({ error: 'Mot de passe invalide. Doit contenir entre 7 et 12 caractères, dont au moins un chiffre !' });
  }*/

  models.User.findOne({
    attributes: ['email'],  // Savoir si un utilisateur existe déja grâce à son email
    where: { email: email }
  })
    .then(userFound => {
      if (!userFound) {  // S'il existe pas

        bcrypt.hash(password, 10, function (err, bcryptedPassword) { // le module bcrypt permet hacher et saler le mot de passe
          const newUser = models.User.create({  //  Création d'un utilisateur qui sera ensuite enregistré dans la base de données
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcryptedPassword, // mot de passe crypté
            isAdmin: false // Pour forcer quil ne soit pas admin.
          })
            .then(createUser => {
              return res.status(201).json({ userId: createUser.id, message: 'Utilisateur créé !' }) // retourne l'id du nouvel utilisateur
            })
            .catch(error => {
              return res.status(500).json({ error })
            });
        });
      } else {
        return res.status(409).json({ error: 'Utilisateur existant !' })
      }
    })
    .catch(err => {
      return res.status(500).json({ error: 'Pas possible' })
    });

};


///////////////////////////// Login ///////////////////////////

exports.login = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: 'Certains champs sont manquants !' });
  };

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: ' Adresse email non valide!' });
  };

  /*if (!PASSWORD_REGEX.test.password) {
    return res.status(400).json({ error: 'Mot de passe invalide. Doit contenir entre 7 et 12 caractères, dont au moins un chiffre !' });
  }*/

  models.User.findOne({
    where: { email: email }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur inconnu !' });
      }
      bcrypt.compare(password, user.password)  // bcrypt permet de comparer le mp entré par le user et celui ds la bdd
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({    // Si le résultat est positif
            userId: user.id,       // retourne l'user et le token
            isAdmin: user.isAdmin,
            token: jwt.sign(
              {
                userId: user.id,
                isAdmin: user.isAdmin
              },
              process.env.S_TOKEN,
              { expiresIn: '14h' }
            )
          });
        })
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


///////////////////////////// Logout ///////////////////////////

exports.logout = (req, res, next) => {

  
  var headerAuth  = req.headers['authorization'];  // récupération de l'en-tête authorization de la requête
  var userId      = auth.getUserId(headerAuth); // appel du mdware auth et ensuite appel de getUserId tout en passant en param l'en-tête d'autorisation

  models.User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin'],
    where: { id: userId }
  })
    .then(user => {
      if (!user) return res.status(400).json({ error: "Utilisateur inexistant !" });

      return res.status(200).json({
        success: 'Déconnexion réussie !'
      });
    })
    .catch(error => res.status(500).json({ error }));
};


//////////////////// All users ///////////////////////////

exports.getAllUsers = (req, res, next) => {

  models.User.findOne({
    where: {
      isAdmin: 1
    }
  })
  .then(admin => {
    if (!admin) {
      return res.status(401).json({ error: 'Pas admin !' });
  }
    models.User.findAll({
      order: [
      ['createdAt', 'DESC']
    ]
    })
      .then(users => res.status(200).json(users))
      .catch(error => res.status(500).json({ error: 'Aucune données !' }))
  })
  .catch(error => res.status(500).json({ error }));
}


///////////////////////////// Get user profile /////////////////////

exports.getUserProfil = (req, res, next) => {

  var headerAuth  = req.headers['authorization'];
  var userId      = auth.getUserId(headerAuth);

  if (userId < 0)
  return res.status(400).json({ 'error': 'wrong token' });

  models.User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin'],
    where: { id: userId }
  })
    .then(user => {
      if (user) {
        res.status(201).json(user)
        console.log(user)
      } else {
        res.status(404).json({ error: error })
      }
    })
    .catch((error) => res.status(404).json({ error }));
};


/////////////////// Update Profile /////////////////

exports.updateUserProfil = (req, res, next) => {

  var headerAuth  = req.headers['authorization'];
  var userId      = auth.getUserId(headerAuth);

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  if (!firstName) {
    console.log('fn manquant')
    return res.status(400).json({ error: 'Attention champs vide !' });
  };

  if (!lastName) {
    console.log('ln manquant')
    return res.status(400).json({ error: 'Attention champs vide !' });
  };

  if (!email) {
    console.log('email manquant')
    return res.status(400).json({ error: 'Attention champs vide !' });
  };

  if (firstName.length <= 1 || firstName.length >= 20) {
    return res.status(400).json({ error: 'Votre prénom doit avoir entre 2 et 19 Caractères !' });
  };

  if (lastName.length <= 1 || lastName.length >= 20) {
    return res.status(400).json({ error: 'Votre nom doit avoir entre 2 et 19 Caractères !' });
  };

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: ' Adresse email non valide!' });
  }

  models.User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email'],
    where: { id: userId }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur inconnu !' });
      }
      models.User.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        updatedAt: new Date()  // Date de la modification
      }, {
        where: {
          id: user.id
        }
      })
        .then(resultat => {
          res.status(200).json({ success: 'Modification effectuée !' })
        })
        .catch((error) => {
          res.status(404).json({ error: error })
        })
    })
    .catch((error) => res.status(404).json({ error: error }))
};


////////////////////// Delete profil //////////////

exports.deleteUserProfil = (req, res, next) => {

  var headerAuth  = req.headers['authorization'];
  var userId      = auth.getUserId(headerAuth);

  models.User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin'],
    where: { id: userId }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur inconnu !' });
      }

      models.User.destroy({
        attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
        where: { id: id }
      })
        .then(() => {
          res.status(201).json({ message: 'Compte supprimé !' })
        })
        .catch((error) => res.status(404).json({ error: error }));
    })
    .catch((error) => res.status(404).json({ error: error }))
};