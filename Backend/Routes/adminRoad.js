const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const { admin } = require('../Middlewares/admin');
const { auth } = require('../Middlewares/auth');
const { verifyAdmin } = require('../Middlewares/verifyOwnership');
const { sanitize } = require('../Middlewares/sanitize');
const upload = require('../Middlewares/multFile');

// ARTICLES

router.get('/articles/all/', auth, admin, adminController.getAllArticlesInfo);
router.post('/articles/', auth, sanitize, admin, upload.single('avatar'), adminController.addArticle);
router.put('/articles/:articleId', auth, sanitize, admin, adminController.editArticleById);
router.delete('/articles/:articleId', auth, sanitize, admin, adminController.deleteArticleById);

// COMMENTS

router.get('/comments/all/', auth, admin, adminController.getAllComments);
router.delete('/comments/:commentId', auth, sanitize, admin, verifyAdmin, adminController.deleteCommentByAdmin);

// USERS

router.get('/users/all/', auth, admin, adminController.getAllUsers);
router.get('/users/user/:userId', auth, admin, adminController.getUserById);
router.get('/users/user/all/:userId', auth, admin, adminController.getAllInfoUserAdmin);
router.get('/users/isAdmin/', auth, admin, adminController.isAdmin);
router.delete('/users/delete/:userId', auth, sanitize, admin, verifyAdmin, adminController.deleteUserById);

// FORMS

router.get('/forms/all/', auth, admin, adminController.getAllFormsAdmin);
router.post('/forms/', auth, sanitize, admin, upload.single('avatar'), adminController.addForm);
router.put('/forms/:formId', auth, sanitize, admin, adminController.editFormById);
router.delete('/forms/:formId', auth, sanitize, admin, adminController.deleteFormById);

module.exports = router;