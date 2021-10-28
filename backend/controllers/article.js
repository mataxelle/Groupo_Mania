const auth = require('../middleware/auth');
const models = require('../models');

const ITEMS_LIMIT = 100;


// Création d'un article
exports.createArticle = (req, res, next) => {

    // récupération de l'en-tête d'authentification
    var headerAuth  = req.headers['authorization'];
    var userId      = auth.getUserId(headerAuth);

    var title = req.body.title;
    var text = req.body.text;

    console.log(req.body)

    
    if (title == null) {
        return res.status(400).json({ error: 'Titre manquant !' })
    };

    if (text == null) {
        return res.status(400).json({ error: 'Contenu manquant !' })
    };

    if (title.length <= 2 || text.length <= 2) {
        return res.status(400).json({ error: 'Contenu pas assez long !' })
    };

    models.User.findOne({
        where: { id: userId }
      })
        .then(userFound => {
            if (!userFound) {
                return res.status(401).json({ error: 'Utilisateur inconnu !' });
            }

            const art = models.Article.create({
                title: title,
                text: text,
                likes: 0,
                attachement: null,
                UserId: userFound.id
            })
                .then(createArticle => {
                    return res.status(201).json({ articleId: createArticle.id, message: 'Message créé !' }) // retourne l'id du nouvel article
                })
                .catch(error => {
                    return res.status(400).json({ error: error })
                });
        })
        .catch(error => {
            res.status(400).json({ error: 'Impossible !' });
        });

};


// Récupération d'un article
exports.getOneArticle = (req, res, next) => {

    const id = req.params.id;
    console.log(id)


    models.Article.findOne({
        where: { id: id },
        include: [{
            model: models.User,
            attributes: [ 'firstName' ]
        }]
    })
        .then(article => {
            if (!article) {
                return res.status(400).json({ error: "Article non disponible !"})
            }
            res.status(200).json(article)
        })
        .catch(error => {
            res.status(400).json({ error });
        })
};


// Récupération/affichage des articles
exports.getAllArticle = (req, res, next) => {

    var fields = req.query.fields;  // Sélectionne les colonnes que l'on souhaite afficher
    var limit = parseInt(req.query.limit); // Récupération par segmentation
    var offset = parseInt(req.query.offset);  //
    var order = req.query.order;  // Sortir les messages par un ordre particulier

    if (limit > ITEMS_LIMIT) {
        limit = ITEMS_LIMIT;
    }

    models.Article.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
            model: models.User,
            attributes: [ 'firstname' ]
          }]
    })
        .then(articles => {
            if (!articles) {
                return res.status(401).json({ error: 'Aucun article trouvé !' });
            }
            console.log(articles)
            res.status(200).json(articles);
        })
        .catch(error => {
            res.status(400).json({ error: 'Impossible ' });
        });
};


// Modification d'un article
exports.modifyArticle = (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = auth.getUserId(headerAuth);

    const id = req.params.id;

    var title = req.body.title;
    var text = req.body.text;

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: { id: userId }
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur inconnu !' });
        }

        models.Article.findOne({
            where: { id: id },
            include: [{
                model: models.User,
                attributes: ['firstName']
            }]
        })
            .then(article => {
                if (!article) {
                    return res.status(401).json({ error: 'Article inconnu !' });
                }
    
                if (article.userId !== userId) {
                    return res.status(401).json({ error: 'Action non possible !' });
                }
    
                models.Article.update({
                    title: title,
                    text: text,
                    updatedAt: new Date()
                }, {
                    where: {
                        id: article.id
                    }
                })
                    .then(resultat => {
                        res.status(200).json({ success: 'Modification effectuée !' })
                    })
                    .catch((error) => res.status(404).json({ error: error }));
            })
            .catch((error) => res.status(404).json({ error: error }));
    })
    .catch((error) => res.status(404).json({ error: error }));

};


// Suppression d'un article
exports.deleteArticle = (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = auth.getUserId(headerAuth);

    const id = req.params.id;

    models.User.findOne({
        attributes: ['firstName'],
        where: { id: userId }
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur inconnu !' });
        }

        models.Article.findOne({
            where: { id: id },
            include: [{
                model: models.User,
                attributes: ['id', 'firstName', 'lastName']
            }]
        })
            .then(article => {
                if (!article) {
                    return res.status(401).json({ error: 'Article inconnu !' });
                }
    
                if (article.userId !== userId) {
                    return res.status(401).json({ error: 'Action non possible !' });
                }
    
                models.Article.destroy({
                    attributes: ['id', 'titre', 'text'],
                    where: {
                            id: id
                    }
                })
                    .then(resultat => {
                        res.status(200).json({ success: 'Article supprimé !' })
                        .catch(error => res.status(404).json({ error: error }));
                    })
            })
            .catch(error => res.status(404).json({ error: error }));
    })
    .catch(error => res.status(404).json({ error: error }));
};


// Appréciations
exports.likeOrDislike = (req, res, next) => {

};