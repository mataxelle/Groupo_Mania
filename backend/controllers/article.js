const models = require('../models');

const ITEMS_LIMIT = 100;


// Création d'un article
exports.createArticle = (req, res, next) => {
    var title = req.body.title;
    var text = req.body.text;
    var userId = req.body.id;   // id du user?

    console.log(req.body)
    if (title == null || text == null) {
        return res.status(400).json({ error: 'Contenu vide !' })
    };

    if (title.length <= 2 || text.length <= 2) {
        return res.status(400).json({ error: 'Contenu pas assez long !' })
    };

    models.User.findOne({
        where: { id: userId }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur inconnu !' });
            }

            models.Article.create({
                title: title,
                text: text,
                likes: 0,
                UserId: userId
            })
                .then(createArt => {
                    return res.status(201).json({ artId: createArt.id, message: 'Message créé !' }) // retourne l'id du nouvel utilisateur
                })
                .catch(error => {
                    return res.status(400).json({ error: 'Pas de création' })
                });
        })
        .catch(error => {
            res.status(400).json({ error });
        });
};


// Récupération d'un article
exports.getOneArticle = (req, res, next) => {

    models.Article.findOne({
        where: { id: id }, 
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName']
        }]
    })
        .then(article => res.status(200).json(article))
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
        order: [(order != null) ? order.split(':') : ['id', 'DESC']],
        attributes: (fields !== '*' && fields !== null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{ // Inclure la table User
            model: models.User,
            attributes: ['firstName', 'lastName'] // Afficher nom et prénom
        }]
    })
        .then(articles => {
            if (articles) {
                res.status(201).json(articles);
            } else {
                res.status(400).json({ error: 'Aucun article trouvé!' });
            }
        })
        .catch(error => {
            res.status(400).json({ error });
        });
};


// Modification d'un article
exports.modifyArticle = (req, res, next) => {

    models.Article.findOne({
        where: { id: id }, 
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName']
        }]
    })
        .then(article => res.status(200).json(article))
        .catch(error => {
            res.status(400).json({ error });
        })

};


// Suppression d'un article
exports.deleteArticle = (req, res, next) => {

    models.Article.findOne({
        where: { id: id }, 
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName']
        }]
    })
        .then(article => res.status(200).json(article))
        .catch(error => {
            res.status(400).json({ error });
        })

};


// Appréciations
exports.likeOrDislike = (req, res, next) => {

};