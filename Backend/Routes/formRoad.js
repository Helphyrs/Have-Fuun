const express = require('express');
const router = express.Router();
const formController = require('../Controllers/formController');


router.get('/all', formController.getAllForms);
router.get('/:formId', formController.getFormById);
router.get('/name/:name', formController.getFormByName);


module.exports = router;
