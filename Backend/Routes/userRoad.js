const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { auth } = require('../Middlewares/auth');
const { sanitize } = require('../Middlewares/sanitize');
const { verifyUserOwnership } = require('../Middlewares/verifyOwnership');

router.post('/', sanitize, userController.addUser);

router.get('/token/', auth, userController.getUserByToken)
router.get('/allInfo/token/', auth, userController.getAllInfoUser)
router.get('/:userId', auth, sanitize, verifyUserOwnership, userController.getUserById);
router.put('/edit/', auth, sanitize, userController.editUserByToken)
router.put('/:userId', auth, sanitize, verifyUserOwnership, userController.editUserById);
router.delete('/delete/', auth, sanitize, userController.deleteUserByToken)
router.delete('/:userId', auth, sanitize, verifyUserOwnership, userController.deleteUserById);


module.exports = router;