module.exports = {

    addForm: async (db, form) => {
        try {
            const { name, description, topic_A, topic_B, topic_C } = form;
            const [results] = await db.execute(
                'INSERT INTO Form (name, description, topic_A, topic_B, topic_C) VALUES (?, ?, ?, ?, ?)',
                [name, description, topic_A, topic_B, topic_C]
            );
            return results.insertId;
        } catch (error) {
            console.error('Error while adding form:', error);
            throw error;
        }
    },

    getFormById: async (db, formId) => {
        try {
            const [results] = await db.execute('SELECT * FROM Form WHERE ID_form = ?', [formId]);
            const form = results[0];
            if (form) {
                form.topic_A = form.topic_A ? form.topic_A.split(',') : [];
                form.topic_B = form.topic_B ? form.topic_B.split(',') : [];
                form.topic_C = form.topic_C ? form.topic_C.split(',') : [];
            }
            return form;
        } catch (error) {
            console.error('Error while fetching form by ID:', error);
            throw error;
        }
    },

    getFormByName: async (db, formName) => {
        try {
            const [results] = await db.execute('SELECT * FROM Form WHERE name = ?', [formName]);
            const form = results[0];
            if (form) {
                form.topic_A = form.topic_A ? form.topic_A.split(',') : [];
                form.topic_B = form.topic_B ? form.topic_B.split(',') : [];
                form.topic_C = form.topic_C ? form.topic_C.split(',') : [];
            }
            return form;
        } catch (error) {
            console.error('Error while fetching form by name:', error);
            throw error;
        }
    },

    getAllForms: async (db) => {
        try {
            const [results] = await db.execute('SELECT * FROM Form');
            results.forEach(form => {
                form.topic_A = form.topic_A ? form.topic_A.split(',') : [];
                form.topic_B = form.topic_B ? form.topic_B.split(',') : [];
                form.topic_C = form.topic_C ? form.topic_C.split(',') : [];
            });
            return results;
        } catch (error) {
            console.error('Error while fetching all forms:', error);
            throw error;
        }
    },

    editFormById: async (db, formId, form) => {
        try {
            const { name, description, topic_A, topic_B, topic_C } = form;
            await db.execute(
                'UPDATE Form SET name = ?, description = ?, topic_A = ?, topic_B = ?, topic_C = ? WHERE ID_form = ?',
                [name, description, topic_A, topic_B, topic_C, formId]
            );
        } catch (error) {
            console.error('Error while updating form:', error);
            throw error;
        }
    },

    deleteFormById: async (db, formId) => {
        try {
            await db.execute('DELETE FROM Form WHERE ID_form = ?', [formId]);
        } catch (error) {
            console.error('Error while deleting form:', error);
            throw error;
        }
    }

};
