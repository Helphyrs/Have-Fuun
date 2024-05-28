const userModel = require('../Models/user');
const bcrypt = require('bcrypt');

module.exports = {
    getUserById: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await userModel.getUserById(req.db, userId);
            user ? res.status(200).send(user) : res.status(404).send('User not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    addUser: async (req, res) => {
        try {
            const user = req.body;
            const role = 3;
            if (user.hasAcceptedTerms === true) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword
                const userId = await userModel.addUser(req.db, user, role);
                res.status(201).send(`User added with ID: ${userId}`);
            }
            res.status(403).send('Terms have not been accepted')
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    editUserById: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = req.body;
            if (!user.password) {
                const currentUser = await userModel.getUserPassword(req.db, userId);
                user.password = currentUser.password;
            } else {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
            await userModel.editUserById(req.db, userId, user);
            res.status(200).send('User updated successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.userId;
            await userModel.deleteUserById(req.db, userId);
            res.status(200).send('User deleted successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
};
