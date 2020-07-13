const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const helmet = require("helmet");

const userRoutes = require('./routes/user')

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

////////// Chemin d'accès des endpoints ////////
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('api/auth', userRoutes);

module.exports = app;