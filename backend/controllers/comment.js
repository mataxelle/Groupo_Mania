const auth = require('../middleware/auth');
const models = require('../models');



exports.createComment = (req, res, next) => {

    var headerAuth = req.headers['authorization'];
    var userId = auth.getUserId(headerAuth);

    var commentaire = req.body.comment;
    console.log(req.body);

    var articleId = req.params.id;

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

            models.Article.findOne({
                where: { id: articleId }
            })
                .then(article => {
                    if (!article) {
                        return res.status(401).json({ error: 'Article inconnu !' });
                    }

                    const comment = models.Comment.create({
                        commentaire: commentaire,
                        articleId: articleId,
                        userId: userId
                    })
                        .then(comment => {
                            return res.status(201).json({ comment, message: 'Commentaire créé !' }) // retourne l'id du nouveau commentaire
                        })
                        .catch(error => {
                            return res.status(400).json({ error: 'Pas de création' })
                        });
                })
                .catch(error => {
                    res.status(400).json({ error: 'Problème ici !' });
                });
        })
        .catch(error => {
            res.status(400).json({ error: 'Impossible !' });
        });
};


// Afficher commentaire
exports.getComment = (req, res, next) => {

    var articleId = req.params.id;

    models.Article.findOne({
        where: { id: articleId },
        /*include: [{
            model: models.User,
            attributes: ['firstName', 'lastName']
        }]*/
    })
        .then(article => {
            if (!article) {
                return res.status(401).json({ error: "Article inconnu !" });
            }

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
                    res.status(400).json({ error: 'Pas possible !' });
                });
        })
        .catch(error => {
            res.status(400).json({ error: 'Impossible !' });
        });
};


// Suppression comment
exports.deleteComment = (req, res, next) => {

    var headerAuth = req.headers['authorization'];
    var userId = auth.getUserId(headerAuth);

    const id = req.params.id;

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: { id: userId }
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur inconnu !' });
        }

        models.Comment.findOne({
            where: { id: id }
        })
            .then(comment => {
                if (!comment) {
                    return res.status(401).json({ error: 'Commentaire inconnu !' });
                }
    
                if (comment.userId !== userId) {
                    return res.status(401).json({ error: 'Action non possible !' });
                }
    
                models.Comment.destroy({
                    attributes: ['id','commentaire'],
                    where: {
                            id: id
                    }
                })
                    .then(resultat => {
                        res.status(200).json({ success: 'Commentaire supprimé !' })
                    })
                   .catch(error => res.status(404).json({ error: 'ici' }));
            })
            .catch(error => res.status(404).json({ error: 'par ici' }));
    })
    .catch(error => res.status(404).json({ error: 'non ici' }));

};