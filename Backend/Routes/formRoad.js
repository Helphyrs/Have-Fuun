const express = require('express');
const router = express.Router();
const formController = require('../Controllers/formController');
const { auth } = require('../Middlewares/auth');
const { admin } = require('../Middlewares/admin');
const { sanitize } = require('../Middlewares/sanitize');

router.get('/all', formController.getAllForms);
router.get('/:formId', formController.getFormById);
router.get('/name/:name', formController.getFormByName);

router.post('/admin', auth, admin, sanitize, formController.addForm);
router.put('/admin/:formId', auth, admin, sanitize, formController.editFormById);
router.delete('/:formId', auth, admin, sanitize, formController.deleteFormById);
router.get('/admin/all', auth, admin, sanitize, formController.getAllFormsAdmin)

module.exports = router;
