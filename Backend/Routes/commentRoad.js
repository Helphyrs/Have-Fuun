const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/commentController');
const { auth } = require('../Middlewares/auth');
const { admin } = require('../Middlewares/admin');
const { sanitize } = require('../Middlewares/sanitize')
const { verifyCommentOwnership } = require('../Middlewares/verifyOwnership');

router.get('/:articleId', commentController.getCommentsByArticle);

router.post('/', auth, sanitize, commentController.addComment);
router.put('/:commentId', auth, verifyCommentOwnership, sanitize, commentController.editComment);
router.delete('/:commentId', auth, verifyCommentOwnership, commentController.deleteComment);
router.get('/comment/:commentId', auth, verifyCommentOwnership, commentController.getCommentsByUser);

router.delete('/admin/:commentId', auth, admin, commentController.deleteCommentByAdmin);
router.get('/admin', auth, admin, commentController.getAllComments);

module.exports = router;
