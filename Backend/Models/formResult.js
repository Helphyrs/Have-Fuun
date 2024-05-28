module.exports = {
    addFormResult: async (db, ID_form, ID_user, result) => {
        try {
            const [results] = await db.execute('INSERT INTO Form_result (ID_form, ID_user, result) VALUES (?, ?, ?)', [ID_form, ID_user, result]);
            return results.insertId;
        } catch (error) {
            console.error('Error adding form result:', error);
            throw error;
        }
    }
};
