const commentModel = require('../Models/comment');

module.exports = {
    addComment: async (req, res) => {
        try {
            const userId = req.userInfo.userId
            const { content, articleId } = req.body;
            if (content.length < 10) return res.status(400).send("Comment can't be less than 10 characters")
            const commentId = await commentModel.addComment(req.app.locals.db, userId, articleId, content);
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
            if (content.length < 10) return res.status(400).send("Comment can't be less than 10 characters")
            await commentModel.editComment(req.app.locals.db, commentId, content);
            res.status(200).send('Comment updated successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            await commentModel.deleteComment(req.app.locals.db, commentId);
            res.status(200).send({ text: 'Comment deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getCommentsByUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            const comments = await commentModel.getCommentsByUser(req.app.locals.db, userId);
            res.status(200).send(comments);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getCommentsByArticle: async (req, res) => {
        try {
            const articleId = req.params.articleId;
            const comments = await commentModel.getCommentsByArticle(req.app.locals.db, articleId);
            res.status(200).send(comments)
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

};
