const express = require('express');
const router = express.Router();
const formResultController = require('../Controllers/formResultController');
const { auth } = require('../Middlewares/auth');

router.post('/', auth, formResultController.addFormResult);

module.exports = router