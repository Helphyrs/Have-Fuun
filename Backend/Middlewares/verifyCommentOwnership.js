const commentModel = require('../Models/comment');

const verifyCommentOwnership = async (req, res, next) => {
    const commentId = req.params.commentId;
    const userId = req.userInfo.userId;
    try {
        const isOwner = await commentModel.verifyCommentOwnership(req.db, commentId, userId);
        if (!isOwner) return res.status(403).json({ error: 'Access forbidden. You do not own this comment.' });
        next();
    } catch (error) {
        console.error('Erreur lors de la vérification de la propriété du commentaire :', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { verifyCommentOwnership };