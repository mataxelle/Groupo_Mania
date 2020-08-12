const express = require('express');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');
const articleCtrl = require('../controllers/article');
const commentCtrl = require('../controllers/comment');


exports.router = (function () {
    var apiRoutes = express.Router();

    // User
    apiRoutes.post('/auth/signup/', userCtrl.signup);

    apiRoutes.post('/auth/login/', userCtrl.login);

    apiRoutes.post('/auth/logout/', userCtrl.logout);

    //apiRoutes.get('/users/',  userCtrl.getAllUsers);

    apiRoutes.get('/users/profil/', userCtrl.getUserProfil);

    apiRoutes.put('/users/profil/', multer, userCtrl.updateUserProfil);

    apiRoutes.delete('/users/profil/', userCtrl.deleteUserProfil);


    // Article
    apiRoutes.post('/articles/', multer, articleCtrl.createArticle);

    apiRoutes.get('/articles/', articleCtrl.getAllArticle);

    apiRoutes.get('/articles/:id', articleCtrl.getOneArticle);

    /*apiRoutes.put('/articles/:id', multer, articleCtrl.modifyArticle);

    apiRoutes.delete('/articles/:id', articleCtrl.deleteArticle);

    // comment et like
    apiRoutes.post('/articles/:id/comment', auth, commentCtrl.createComment);

    apiRoutes.get('/articles/:id/comment', auth, commentCtrl.getComment);

    apiRoutes.delete('/articles/:id/comment', auth, commentCtrl.deleteComment);

    apiRoutes.post('/articles/:id/like', auth, articleCtrl.likeOrDislike);*/

    return apiRoutes;
})(); //pour instancier le routeur