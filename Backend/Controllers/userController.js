const userModel = require('../Models/user');
const bcrypt = require('bcrypt');

module.exports = {
    getUserById: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await userModel.getUserById(req.app.locals.db, userId);
            user ? res.status(200).send(user) : res.status(404).send('User not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    getUserByToken: async (req, res) => {
        try {
            const userId = req.userInfo.userId;
            const user = await userModel.getUserById(req.app.locals.db, userId);
            user ? res.status(200).send(user) : res.status(404).send('User not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    getAllInfoUser: async (req, res) => {
        try {
            const userId = req.userInfo.userId;
            const user = await userModel.getUserById(req.app.locals.db, userId);
            const comment = await userModel.getCommentsWithArticleNameByUserId(req.app.locals.db, userId);
            const formResult = await userModel.getFormResultsWithFormNameByUserId(req.app.locals.db, userId);
            user ? res.status(200).send({ user, comment, formResult }) : res.status(404).send('Info user not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    getAllInfoUserAdmin: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await userModel.getUserById(req.app.locals.db, userId);
            const comment = await userModel.getCommentsWithArticleNameByUserId(req.app.locals.db, userId);
            const formResult = await userModel.getFormResultsWithFormNameByUserId(req.app.locals.db, userId);
            user ? res.status(200).send({ user, comment, formResult }) : res.status(404).send('Info user not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const user = await userModel.getAllUsers(req.app.locals.db);
            user ? res.status(200).send(user) : res.status(404).send('Info user not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    addUser: async (req, res) => {
        try {
            const user = req.body;
            const role = 3;
            if (user.hasAcceptedTerms === 'true') {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword
                const userId = await userModel.addUser(req.app.locals.db, user, role);
                res.status(201).send(`User added with ID: ${userId}`);
            } else {
                res.status(403).send('Terms have not been accepted')
            }

        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    editUserById: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = req.body;
            if (!user.password) {
                const currentUser = await userModel.getUserPassword(req.app.locals.db, userId);
                user.password = currentUser.password;
            } else {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
            await userModel.editUserById(req.app.locals.db, userId, user);
            res.status(200).send('User updated successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    editUserByToken: async (req, res) => {
        try {
            const userId = req.userInfo.userId;
            const user = req.body;
            if (!user.password) {
                const currentUser = await userModel.getUserPassword(req.app.locals.db, userId);
                user.password = currentUser.password;
            } else {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
            await userModel.editUserById(req.app.locals.db, userId, user);
            res.status(200).send('User updated successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const userId = parseInt(req.params.userId);
            await userModel.deleteUserById(req.app.locals.db, userId);
            res.status(200).send('User deleted successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    deleteUserByToken: async (req, res) => {
        try {
            const userId = req.userInfo.userId;
            await userModel.deleteUserById(req.app.locals.db, userId);
            res.status(200).send('User deleted successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    isAdmin: async (req, res) => {
        try {
            res.status(200).send(true);
        } catch (error) {
            res.status(500).send('Internal Server Error');

        }
    }
};
