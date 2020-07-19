const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

  console.log(req.body.firstName)
  console.log(req.body.lastName)
  console.log(req.body.email)
  console.log(req.body.password)

  if (!firstName) {
    console.log('fn manquant')
    //return res.status(400).json({ error: 'Certains champs sont manquants !' });
  };
  if (!lastName) {
    console.log('ln manquant')
    //return res.status(400).json({ error: 'Certains champs sont manquants !' });
  };
  if (!email) {
    console.log('email manquant')
    //return res.status(400).json({ error: 'Certains champs sont manquants !' });
  };
  if (!password) {
    console.log('pw manquant')
    //return res.status(400).json({ error: 'Certains champs sont manquants !' });
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

        bcrypt.hash(password, 10, function (err, bcryptedPassword) { // hacher et saler le mot de passe
          const newUser = models.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcryptedPassword, // mot de passe crypté
            isAdmin: 0 // Pour forcer que le nouvel utilisateur ne soit pas Admin
          })
            .then(createUser => {
              return res.status(201).json({ userId: createUser.id }) // retourne l'id du nouvel utilisateur
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

  models.User.findOne({
    where: { email: email }
  }) 
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              {
                userId: user.id,
                //isAdmin: user.isAdmin
              },
              process.env.S_TOKEN,
              { expiresIn: '14h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
};


///////////////////////////// Login ///////////////////////////

exports.logout = (req, res, next) => {

  const id = req.body.id;

  models.User.findOne({ 
    where: { id: id }                // A TERMINER
  })
    .then()
    .catch(error => res.status(500).json({ error }));
};


///////////////////////////// Profil /////////////////////

exports.getUserProfil = (req, res, next) => {

  const id = req.body.id;

  models.User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email'],
    where: { id: id }
  })
    .then(user => {
      if (user) {
        res.status(201).json(user)
      } else {
        res.status(404).json({ error: error })
      }
    })
    .catch((error) => res.status(404).json({ error: error }));
};

exports.updateUserProfil = (req, res, next) => {

};

exports.deleteUserProfil = (req, res, next) => {

};