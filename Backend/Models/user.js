module.exports = {
    getUserById: async (db, userId) => {
        try {
            const [results] = await db.execute('SELECT * FROM Users WHERE ID = ?', [userId]);
            return results[0];
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            throw error;
        }
    },

    addUser: async (db, user) => {
        try {
            const [results] = await db.execute('INSERT INTO Users (pseudo, email, password, avatar) VALUES (?, ?, ?)',
                [user.pseudo, user.email, user.password, user.avatar]);
            return results.insertId;
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            throw error;
        }
    },

    editUserById: async (db, userId, user) => {
        try {
            await db.execute('UPDATE Users SET pseudo = ?, email = ?, password = ?, avatar = ? WHERE ID = ?',
                [user.pseudo, user.email, user.password, user.avatar, userId]);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            throw error;
        }
    },

    deleteUserById: async (db, userId) => {
        try {
            await db.execute('DELETE FROM Users WHERE ID = ?', [userId]);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            throw error;
        }
    }
};
