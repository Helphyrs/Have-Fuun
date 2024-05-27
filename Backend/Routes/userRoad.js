const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')
const { auth } = require('../Middlewares/auth');

router.get('/:id', auth, userController.getUserById)
router.post('/', userController.addUser)
router.put('/:id', auth, userController.editUserById)
router.delete('/:id', auth, userController.deleteUserById)

module.exports = router