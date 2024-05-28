const express = require('express');
const router = express.Router();
const articleController = require('../Controllers/articleController');
const { auth } = require('../Middlewares/auth');
const { admin } = require('../Middlewares/admin')

router.get('/name/:name', articleController.getAllArticleInfoByName);
router.get('/all', articleController.getAllArticles);
router.get('/article/:articleId', articleController.getArticleById);


router.post('/admin', auth, admin, articleController.addArticle);
router.put('/admin/:articleId', auth, admin, articleController.editArticleById);
router.delete('/admin/:articleId', auth, admin, articleController.deleteArticleById);

module.exports = router;