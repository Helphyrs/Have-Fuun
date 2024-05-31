const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const { sanitize } = require('../Middlewares/sanitize');
const { auth } = require('../Middlewares/auth')

router.post('/', sanitize, authController.loginUser);
router.get('/', auth, authController.isTokenValid)

module.exports = router;