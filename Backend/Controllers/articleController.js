const articleModel = require('../Models/article');

module.exports = {

    getArticleById: async (req, res) => {
        try {
            const articleId = req.params.articleId;
            const article = await articleModel.getArticleById(req.db, articleId);
            article ? res.status(200).send(article) : res.status(404).send('Article not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    getAllArticleInfoByName: async (req, res) => {
        try {
            const articleName = req.params.name;
            const articleWithComment = await articleModel.getArticleWithComments(req.db, articleName);
            articleWithComment ? res.status(200).send(articleWithComment) : res.status(404).send('Article not found');
        } catch (error) {
            console.error('Error while fetching article by name:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getAllArticles: async (req, res) => {
        try {
            const articles = await articleModel.getAllArticles(req.db);
            res.status(200).send(articles);
        } catch (error) {
            console.error('Error while fetching all articles:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    addArticle: async (req, res) => {
        try {
            const article = req.body;
            const articleId = await articleModel.addArticle(req.db, article);
            res.status(201).send(`Article added with ID: ${articleId}`);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    editArticleById: async (req, res) => {
        try {
            const articleId = req.params.articleId;
            const article = req.body;
            await articleModel.editArticleById(req.db, articleId, article);
            res.status(200).send('Article updated successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    deleteArticleById: async (req, res) => {
        try {
            const articleId = req.params.articleId;
            await articleModel.deleteArticleById(req.db, articleId);
            res.status(200).send('Article deleted successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
};
