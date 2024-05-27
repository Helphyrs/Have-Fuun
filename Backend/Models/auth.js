const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const payload = {
        userId: userId
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    return token;
};

module.exports = {
    authenticateUser: async (db, email, password) => {
        try {
            const [users] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
            const user = users[0];
            if (!user) return null;
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return null;
            const token = generateToken(user.ID);
            return token;
        } catch (error) {
            console.error('Erreur lors de l\'authentification de l\'utilisateur :', error);
            throw error;
        }
    }
};
