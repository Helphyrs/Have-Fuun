module.exports = {
    getUserById: async (db, userId) => {
        try {
            const [results] = await db.execute('SELECT pseudo, email, avatar FROM Users WHERE ID = ?', [userId]);
            return results[0];
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            throw error;
        }
    },
    getUserByMail: async (db, mail) => {
        try {
            const [results] = await db.execute('SELECT email FROM Users WHERE email = ?', [mail]);
            return results[0];
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            throw error;
        }
    },
    getRoleById: async (db, userId) => {
        try {
            const [results] = await db.execute('SELECT role FROM Users WHERE ID = ?', [userId]);
            return results[0];
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            throw error;
        }
    },
    getUserPassword: async (db, userId) => {
        try {
            const [results] = await db.execute('SELECT password FROM Users WHERE ID = ?', [userId]);
            return results[0];
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            throw error;
        }
    },
    getCommentsWithArticleNameByUserId: async (db, userId) => {
        try {
            const query = `
                SELECT c.content, c.ID_comment, a.name 
                FROM Comments c
                INNER JOIN Articles a ON c.ID_article = a.ID_article
                WHERE c.ID_user = ?
            `;
            const [results] = await db.execute(query, [userId]);
            return results;
        } catch (error) {
            console.error('Error while fetching comments with article name:', error);
            throw error;
        }
    },
    getFormResultsWithFormNameByUserId: async (db, userId) => {
        try {
            const query = `
                SELECT fr.result, f.name
                FROM Form_result fr
                INNER JOIN Form f ON fr.ID_form = f.ID_form
                WHERE fr.ID_user = ?
            `;
            const [results] = await db.execute(query, [userId]);
            return results;
        } catch (error) {
            console.error('Error while fetching form results with form name:', error);
            throw error;
        }
    },
    // getUserData: async (db, userId) => {
    //     try {
    //         const [results] = await db.execute(`
    //         SELECT 
    //             DISTINCT u.avatar AS user_avatar,
    //             u.pseudo AS user_pseudo,
    //             u.email AS user_email,
    //             c.content AS comment_content,
    //             a.name AS article_name,
    //             fr.result AS form_result,
    //             f.name AS form_name
    //         FROM 
    //             Users u
    //         LEFT JOIN 
    //             Comments c ON u.ID = c.ID_user
    //         LEFT JOIN 
    //             Articles a ON c.ID_article = a.ID_article
    //         LEFT JOIN 
    //             Form_result fr ON u.ID = fr.ID_user
    //         LEFT JOIN 
    //             Form f ON fr.ID_form = f.ID_form
    //         WHERE 
    //             u.ID = ?
    //     `, [userId]);
    //         return results;
    //     } catch (error) {
    //         console.error('Erreur lors de la récupération des données utilisateur :', error);
    //         throw error;
    //     }
    // },

    getAllUsers: async (db) => {
        try {
            const [results] = await db.execute('SELECT ID, pseudo, email, avatar FROM Users')
            return results
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            throw error;
        }
    },
    addUser: async (db, user, role) => {
        try {
            const [results] = await db.execute('INSERT INTO Users (pseudo, email, password, role, avatar) VALUES (?, ?, ?, ?, ?)',
                [user.pseudo, user.email, user.password, role, user.avatar]);
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
