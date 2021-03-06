/*
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');
const articleCtrl = require('../controllers/article');
const commentCtrl = require('../controllers/comment');


exports.router = (function () {
    var apiRoutes = express.Router();

    // User
    apiRoutes.post('/auth/signup/', userCtrl.signup);

    apiRoutes.post('/auth/login/', userCtrl.login);

    apiRoutes.post('/auth/logout/', auth,  userCtrl.logout);

    apiRoutes.get('/users/',  userCtrl.getAllUsers);

    apiRoutes.get('/users/profil/:id', auth, userCtrl.getUserProfil);

    apiRoutes.put('/users/profil/:id', auth, multer, userCtrl.updateUserProfil);

    apiRoutes.delete('/users/profil/:id', auth, userCtrl.deleteUserProfil);


    // Article
    apiRoutes.post('/articles/', auth, multer, articleCtrl.createArticle);

    apiRoutes.get('/articles/', auth, articleCtrl.getAllArticle);

    apiRoutes.get('/articles/:id', auth, articleCtrl.getOneArticle);

    apiRoutes.put('/articles/:id', auth, multer, articleCtrl.modifyArticle);

    apiRoutes.delete('/articles/:id', auth, articleCtrl.deleteArticle);

    // comment et like
    apiRoutes.post('/articles/:id/comment', auth, commentCtrl.createComment);

    apiRoutes.get('/articles/:id/comment', auth, commentCtrl.getComment);

    apiRoutes.delete('/articles/:id/comment', auth, commentCtrl.deleteComment);

    apiRoutes.post('/articles/:id/like', auth, articleCtrl.likeOrDislike);

    return apiRoutes;
})(); //pour instancier le routeur

*/