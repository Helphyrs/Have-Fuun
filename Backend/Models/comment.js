module.exports = {
    addComment: async (db, userId, articleId, content) => {
        try {
            const [result] = await db.query('INSERT INTO Comments (ID_user,ID_article, content) VALUES (?, ?)', [userId, articleId, content]);
            return result.insertId;
        } catch (error) {
            console.error('Error while adding comment:', error);
            throw error;
        }
    },

    editComment: async (db, commentId, content) => {
        try {
            await db.query('UPDATE Comments SET content = ? WHERE ID_comment = ?', [content, commentId]);
        } catch (error) {
            console.error('Error while editing comment:', error);
            throw error;
        }
    },

    deleteComment: async (db, commentId) => {
        try {
            await db.query('DELETE FROM Comments WHERE ID_comment = ?', [commentId]);
        } catch (error) {
            console.error('Error while deleting comment:', error);
            throw error;
        }
    },

    getCommentsByUser: async (db, userId) => {
        try {
            const [comments] = await db.query('SELECT content FROM Comments WHERE ID_user = ?', [userId]);
            return comments;
        } catch (error) {
            console.error('Error while getting comments by user:', error);
            throw error;
        }
    },

    getAllComments: async (db) => {
        try {
            const [comments] = await db.query('SELECT ID_user, ID_article, content FROM Comments');
            return comments;
        } catch (error) {
            console.error('Error while getting all comments:', error);
            throw error;
        }
    },

    getCommentsByArticle: async (db, articleId) => {
        try {
            const [comments] = await db.query('SELECT ID_user, content FROM Comments WHERE ID_article = ?', [articleId]);
            return comments;
        } catch (error) {
            console.error('Error while getting comments by article:', error);
            throw error;
        }
    },
    verifyCommentOwnership: async (db, commentId, userId) => {
        try {
            const [results] = await db.execute(
                `SELECT c.* FROM Comments c
                INNER JOIN Users u ON c.ID_user = u.ID
                WHERE c.ID_comment = ? AND u.ID = ?`,
                [commentId, userId]
            );
            return results.length > 0;
        } catch (error) {
            console.error('Erreur lors de la vérification de la propriété du commentaire :', error);
            throw error;
        }
    }
};



