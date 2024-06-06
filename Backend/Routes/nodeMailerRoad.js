const express = require('express');
const router = express.Router();
const nodeMailerController = require('../Controllers/nodeMailerController');
const { sanitize } = require('../Middlewares/sanitize')

router.post('/', sanitize, nodeMailerController.sendMail)
module.exports = router;