const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');
const articleCtrl = require('../controllers/article');


exports.router = (function () {
    var apiRoutes = express.Router();

    // User
    apiRoutes.post('/auth/signup/', userCtrl.signup);

    apiRoutes.post('/auth/login/', userCtrl.login);

    apiRoutes.post('/auth/logout/', auth, userCtrl.logout);

    apiRoutes.get('/users/', auth, userCtrl.getAllUsers);

    apiRoutes.get('/users/profil/', auth, userCtrl.getUserProfil);

    apiRoutes.put('/users/profil/', auth, multer, userCtrl.updateUserProfil);

    apiRoutes.delete('/users/profil/', auth, userCtrl.deleteUserProfil);


    // Article
    apiRoutes.post('/articles/', multer, articleCtrl.createArticle);

    apiRoutes.get('/articles/', auth, articleCtrl.getAllArticle);

    apiRoutes.get('/articles/:id', auth, articleCtrl.getOneArticle);

    apiRoutes.put('/articles/:id', auth, multer, articleCtrl.modifyArticle);

    apiRoutes.delete('/articles/:id', auth, articleCtrl.deleteArticle);

    apiRoutes.post('/articles/:id/like', auth, articleCtrl.likeOrDislike)

    return apiRoutes;
})(); //pour instancier le routeur