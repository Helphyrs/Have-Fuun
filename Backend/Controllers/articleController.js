const articleModel = require('../Models/article');

module.exports = {

    getArticleById: async (req, res) => {
        try {
            const articleId = req.params.articleId;
            const article = await articleModel.getArticleById(req.app.locals.db, articleId);
            article ? res.status(200).send(article) : res.status(404).send('Article not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    getAllArticleInfoByName: async (req, res) => {
        try {
            const articleName = req.params.name;
            const article = await articleModel.getArticleByName(req.app.locals.db, articleName)
            if (!article) res.status(404).send('Article not found')
            const commentInfoByArticle = await articleModel.getCommentInfoByArticleName(req.app.locals.db, articleName);
            let info = { article, commentInfoByArticle }
            res.status(200).send(info)
        } catch (error) {
            console.error('Error while fetching article by name:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getAllArticles: async (req, res) => {
        try {
            const articles = await articleModel.getAllArticles(req.app.locals.db);
            res.status(200).send(articles);
        } catch (error) {
            console.error('Error while fetching all articles:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};
