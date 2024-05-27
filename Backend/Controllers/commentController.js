const commentModel = require('../Models/comment');

module.exports = {
    addComment: async (req, res) => {
        try {
            const userId = req.userInfos.userId
            const { content, articleId } = req.body;
            const commentId = await commentModel.addComment(req.db, userId, articleId, content);
            res.status(201).send(`Comment added with ID: ${commentId}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    editComment: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            const { content } = req.body;
            await commentModel.editComment(req.db, commentId, content);
            res.status(200).send('Comment updated successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            await commentModel.deleteComment(req.db, commentId);
            res.status(200).send('Comment deleted successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getCommentsByUser: async (req, res) => {
        try {
            const userId = req.userInfos.userId;
            const comments = await commentModel.getCommentsByUser(req.db, userId);
            res.status(200).send(comments);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getCommentsByArticle: async (req, res) => {
        try {
            const articleId = req.params.articleId;
            const comments = await commentModel.getCommentsByArticle(req.db, articleId);
            res.status(200).send(comments)
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteCommentByAdmin: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            await commentModel.deleteComment(req.db, commentId);
            res.status(200).send('Comment deleted successfully by admin');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getAllComments: async (req, res) => {
        try {
            const comments = await commentModel.getAllComments(req.db);
            res.status(200).send(comments);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};
