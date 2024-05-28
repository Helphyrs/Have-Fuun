module.exports = {
    addFormResult: async (db, formId, userId, result) => {
        try {
            const [results] = await db.execute('INSERT INTO Form_result (ID_form, ID_user, result) VALUES (?, ?, ?)', [formId, userId, result]);
            return results.insertId;
        } catch (error) {
            console.error('Error adding form result:', error);
            throw error;
        }
    }
};
