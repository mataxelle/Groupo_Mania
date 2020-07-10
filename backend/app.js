const express = require('express');
const bodyParser = require('body-parser');

const helmet = require("helmet");

const app = express();

require('dotenv').config() // Permet de cacher des informations sensibles

app.use(helmet());     // Helmet est un module qui empêche
/*Les intrus peuvent utiliser cet en-tête (activé par défaut) afin de détecter 
les applications qui exécutent Express et lancer ensuite des attaques spécifiquement ciblées*/
// app.disable('x-powered-by');




app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;