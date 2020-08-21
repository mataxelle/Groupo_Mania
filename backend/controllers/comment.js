const models = require('../models');



exports.createComment = (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = auth.getUserId(headerAuth);

    var commentaire = req.body.commentaire;
    console.log(req.body);

    var articleId = req.params.articleId;

    if (commentaire == null) {
        return res.status(400).json({ error: 'Contenu vide !' })
    };

    if (commentaire.length <= 2) {
        return res.status(400).json({ error: 'Contenu pas assez long !' })
    };

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: { id: userId }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur inconnu !' });
            }

            models.Comment.create({
                commentaire: commantaire,
                ArticleId: articleId,
                UserId: userId
            })
                .then(commentaire => {
                    return res.status(201).json({ commantaireId: commentaire.id, message: 'Commentaire créé !' }) // retourne l'id du nouveau commentaire
                })
                .catch(error => {
                    return res.status(400).json({ error: 'Pas de création' })
                });
        })
        .catch(error => {
            res.status(400).json({ error: 'Impossible !' });
        });
};


// Afficher commentaire
exports.getComment = (req, res, next) => {

    models.Comment.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(comments => {
            if (!comments) {
                return res.status(401).json({ error: 'Aucun commentaire trouvé !' });
            }
            console.log(comments)
            res.status(200).json(comments);
            /*if (articles) {
                res.status(200).json(articles);
            } else {
                res.status(400).json({ error: 'Aucun article trouvé!' });
            }*/
        })
        .catch(error => {
            res.status(400).json({ error: 'Impossible ' });
        });
};


// Suppression comment
exports.deleteComment = (req, res, next) => {

    var headerAuth  = req.headers['authorization'];
    var userId      = auth.getUserId(headerAuth);

    models.Comment.findOne({
        where: { id: id },
        include: [{
            model: models.Article,
        }, {
            model: models.User,
            attributes: ['firstName', 'lastName']
        }]
    })
        .then(commentaire => {
            if (!commentaire) {
                return res.status(401).json({ error: 'Commentaire inconnu !' });
            }

            if (article.UserId !== req.userId) {
                //if (!req.isAdmin) return res.status(401).json({ error: 'Action non possible !' });
            }

            models.Comment.destroy({
                attributes: ['id', 'commantaire'],
                where: {
                    id: userId
                }
            })
                .then(resultat => {
                    res.status(200).json({ success: 'Commentaire supprimé !' })
                    .catch((error) => res.status(404).json({ error: error }));
                })
        })
        .catch((error) => res.status(404).json({ error: error }));

};