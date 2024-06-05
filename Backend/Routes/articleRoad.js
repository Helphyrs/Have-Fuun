const express = require('express');
const router = express.Router();
const articleController = require('../Controllers/articleController');

router.get('/name/:name', articleController.getAllArticleInfoByName);
router.get('/all', articleController.getAllArticles);
router.get('/article/:articleId', articleController.getArticleById);



module.exports = router;