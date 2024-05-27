const authModel = require('../Models/auth');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const token = await authModel.authenticateUser(req.db, email, password);
            if (token) {
                res.status(200).json({ token });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion de l\'utilisateur :', error);
            res.status(500).send('Internal Server Error');
        }
    },
};
