const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { auth } = require('../Middlewares/auth');
const { sanitize } = require('../Middlewares/sanitize');
const { verifyUserOwnership, verifyAdmin } = require('../Middlewares/verifyOwnership');
const { admin } = require('../Middlewares/admin');

router.post('/', sanitize, userController.addUser);

router.get('/token/', auth, userController.getUserByToken)
router.get('/allInfo/', auth, verifyUserOwnership, userController.getAllInfoUser)
router.get('/:userId', auth, sanitize, verifyUserOwnership, userController.getUserById);
router.put('/edit/', auth, sanitize, userController.editUserByToken)
router.put('/:userId', auth, sanitize, verifyUserOwnership, userController.editUserById);
router.delete('/delete/', auth, sanitize, userController.deleteUserByToken)
router.delete('/:userId', auth, sanitize, verifyUserOwnership, userController.deleteUserById);

router.get('/admin/all/', auth, admin, userController.getAllUsers)
router.get('/admin/user/:userId', auth, admin, sanitize, userController.getUserById)
router.get('/admin/isAdmin/', auth, admin, userController.isAdmin)
router.get('/admin/user/all/:userId', auth, admin, userController.getAllInfoUserAdmin)
router.delete('/admin/delete/:userId', auth, admin, verifyAdmin, userController.deleteUserById)

module.exports = router;