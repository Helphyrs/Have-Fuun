const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const { sanitize } = require('../Middlewares/sanitize');

router.post('/', sanitize, authController.loginUser);

module.exports = router;