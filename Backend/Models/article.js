module.exports = {

    addArticle: async (db, article) => {
        try {
            const { name, description, tags, avatar } = article;
            const [results] = await db.execute('INSERT INTO Articles (name, description, tags, avatar) VALUES (?, ?, ?, ?)', [name, description, tags, avatar]);
            return results.insertId;
        } catch (error) {
            console.error('Error while adding article:', error);
            throw error;
        }
    },

    getArticleById: async (db, articleId) => {
        try {
            const [results] = await db.execute('SELECT * FROM Articles WHERE ID_article = ?', [articleId]);
            return results[0];
        } catch (error) {
            console.error('Error while fetching article by ID:', error);
            throw error;
        }
    },

    getArticleByName: async (db, articleName) => {
        try {
            const [results] = await db.execute('SELECT * FROM Articles WHERE name = ?', [articleName]);
            return results[0];
        } catch (error) {
            console.error('Error while fetching article by name:', error);
            throw error;
        }
    },

    getAllArticles: async (db) => {
        try {
            const [results] = await db.execute('SELECT * FROM Articles');
            return results;
        } catch (error) {
            console.error('Error while fetching all articles:', error);
            throw error;
        }
    },

    getArticleWithComments: async (db, articleName) => {
        try {
            const [results] = await db.execute(`
                SELECT a.*, c.content, u.pseudo, u.avatar
                FROM Articles a
                LEFT JOIN Comments c ON a.ID_article = c.ID_article
                LEFT JOIN Users u ON c.ID_user = u.ID
                WHERE a.name = ?
            `, [articleName]);
            return results;
        } catch (error) {
            console.error('Error while fetching article with comments:', error);
            throw error;
        }
    },
    getCommentInfoByArticleName: async (db, articleName) => {
        try {
            const [results] = await db.execute(`
            SELECT c.content, u.pseudo, u.avatar
            FROM Articles a
            LEFT JOIN Comments c ON a.ID_article = c.ID_article
            LEFT JOIN Users u ON c.ID_user = u.ID
            WHERE a.name = ?
        `, [articleName]);
            return results
        } catch (error) {
            console.error('Error while fetching comments by articleName:', error);
            throw error;
        }
    },

    editArticleById: async (db, articleId, article) => {
        try {
            const { name, description, tags } = article;
            await db.execute('UPDATE Articles SET name = ?, description = ?, tags = ? WHERE ID_article = ?', [name, description, tags, articleId]);
        } catch (error) {
            console.error('Error while editing article by ID:', error);
            throw error;
        }
    },

    deleteArticleById: async (db, articleId) => {
        try {
            await db.execute('DELETE FROM Articles WHERE ID_article = ?', [articleId]);
        } catch (error) {
            console.error('Error while deleting article by ID:', error);
            throw error;
        }
    }

};
