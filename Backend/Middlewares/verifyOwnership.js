const commentModel = require('../Models/comment');

const verifyCommentOwnership = async (req, res, next) => {
    const commentId = parseInt(req.params.commentId);
    const userId = req.userInfo.userId;
    try {
        const isOwner = await commentModel.verifyCommentOwnership(req.db, commentId, userId);
        if (!isOwner) return res.status(403).send({ error: 'Access forbidden. You do not own this comment.' });
        next();
    } catch (error) {
        console.error('Erreur lors de la vérification de la propriété du commentaire :', error);
        res.status(500).send('Internal Server Error');
    }
};

const verifyUserOwnership = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const tokenUserId = req.userInfo.userId;
    userId === tokenUserId ? next() : res.status(403).send('Acces forbidden. You do not have the right ID');
}

module.exports = {
    verifyCommentOwnership,
    verifyUserOwnership
};