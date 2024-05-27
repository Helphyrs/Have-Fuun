// controllers/userController.js
const userModel = require('../Models/user');

module.exports = {
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userModel.getUserById(req.db, userId);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    addUser: async (req, res) => {
        try {
            const user = req.body;
            const userId = await userModel.addUser(req.db, user);
            res.status(201).send(`User added with ID: ${userId}`);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    editUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = req.body;
            await userModel.editUserById(req.db, userId, user);
            res.status(200).send('User updated successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            await userModel.deleteUserById(req.db, userId);
            res.status(200).send('User deleted successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
};
