const commentModel = require('../Models/comment');
const userModel = require('../Models/user');

const verifyCommentOwnership = async (req, res, next) => {
    const commentId = parseInt(req.params.commentId);
    const userId = parseInt(req.userInfo.userId);
    try {
        const isOwner = await commentModel.verifyCommentOwnership(req.app.locals.db, commentId, userId);
        if (!isOwner) return res.status(403).send({ error: 'Access forbidden. You do not own this comment.' });
        next();
    } catch (error) {
        console.error('Erreur lors de la vérification de la propriété du commentaire :', error);
        res.status(500).send('Internal Server Error');
    }
};

const verifyUserOwnership = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const tokenUserId = parseInt(req.userInfo.userId);
    userId === tokenUserId ? next() : res.status(403).send('Acces forbidden. You do not have the right ID');
}

const verifyAdmin = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    try {
        const user = await userModel.getRoleById(req.app.locals.db, userId)
        if (user && user.role === 1) {
            res.status(403).send("Access forbidden : you cannot delete another admin")
        } else {
            next();
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de la propriété du commentaire :', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    verifyCommentOwnership,
    verifyUserOwnership,
    verifyAdmin
};