const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')
const { auth } = require('../Middlewares/auth');

router.post('/', userController.addUser)

router.get('/', auth, userController.getUserById)
router.put('/', auth, userController.editUserById)
router.delete('/', auth, userController.deleteUserById)

module.exports = router