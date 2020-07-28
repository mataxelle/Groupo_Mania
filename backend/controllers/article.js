const models = require('../models');

const ITEMS_LIMIT = 100;


// Création d'un article
exports.createArticle = (req, res, next) => {

    var title = req.body.title;
    var text = req.body.text;
    var image = req.body.imgUrl;
    var id = req.params; // USER INCON
    //const id = req.params.id; UNDEFINED

    console.log(req.body)
    console.log(req.params)
    
    if (title == null || text == null) {
        return res.status(400).json({ error: 'Contenu vide !' })
    };

    if (title.length <= 2 || text.length <= 2) {
        return res.status(400).json({ error: 'Contenu pas assez long !' })
    };

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: { id: id }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur inconnu !' });
            }

            models.Article.create({
                title: title,
                text: text,
                attachement: image,
                likes: 0,
                UserId: userId
            })
                .then(article => {
                    return res.status(201).json({ artId: article.id, message: 'Message créé !' }) // retourne l'id du nouvel utilisateur
                })
                .catch(error => {
                    return res.status(400).json({ error: 'Pas de création' })
                });
        })
        .catch(error => {
            res.status(400).json({ error: 'NOOOOO' });
        });
};


// Récupération d'un article
exports.getOneArticle = (req, res, next) => {

    var id = req.params.id;

    models.Article.findOne({
        where: { id: id },
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName']
        }]
    })
        .then(article => {
            if (article == null) {
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
        order: [(order != null) ? order.split(':') : ['id', 'DESC']],
        /* attributes: (fields !== '*' && fields !== null) ? fields.split(',') : null,
         limit: (!isNaN(limit)) ? limit : null,
         offset: (!isNaN(offset)) ? offset : null,  */
        /*include: [{ // Inclure la table User
            model: models.User,
            attributes: ['firstName', 'lastName'] // Afficher nom et prénom
        }]*/
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
        .then(article => {
            if (!article) {
                return res.status(401).json({ error: 'Article inconnu !' });
            }

            if (article.UserId !== req.userId) {
                if (!req.isAdmin) return res.status(401).json({ error: 'Action non possible !' });
            }

            models.Message.update({
                title: title,
                text: text,
                updatedAt: new Date()
            }, {
                where: {
                    id: user.id
                }
            })
                .then(resultat => {
                    res.status(200).json({ success: 'Modification effectuée !' })
                })
                .catch((error) => res.status(404).json({ error: error }));
        })
        .catch((error) => res.status(404).json({ error: error }));

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
        .then(article => {
            if (!article) {
                return res.status(401).json({ error: 'Article inconnu !' });
            }

            if (article.UserId !== req.userId) {
                if (!req.isAdmin) return res.status(401).json({ error: 'Action non possible !' });
            }

            models.Message.destroy({
                attributes: ['id', 'titre', 'text']
            })
                .then(resultat => {
                    res.status(200).json({ success: 'Article supprimé !' })
                    .catch((error) => res.status(404).json({ error: error }));
                })
        })
        .catch((error) => res.status(404).json({ error: error }));
};


// Appréciations
exports.likeOrDislike = (req, res, next) => {

};