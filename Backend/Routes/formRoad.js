const express = require('express');
const router = express.Router();
const formController = require('../Controllers/formController');
const { auth } = require('../Middlewares/auth');
const { admin } = require('../Middlewares/admin');
const { sanitize } = require('../Middlewares/sanitize');

router.get('/all', formController.getAllForms);
router.get('/:formId', formController.getFormById);
router.get('/name/:name', formController.getFormByName);

router.post('/', auth, admin, sanitize, formController.addForm);
router.put('/:formId', auth, admin, sanitize, formController.editFormById);
router.delete('/:formId', auth, admin, sanitize, formController.deleteFormById);

module.exports = router;
