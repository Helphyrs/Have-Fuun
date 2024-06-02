module.exports = {

    addForm: async (db, form) => {
        try {
            const { name, question, topicA, topicB, topicC, avatar } = form;
            const [results] = await db.execute(
                'INSERT INTO Form (name, question, topicA, topicB, topicC, avatar) VALUES (?, ?, ?, ?, ?, ?)',
                [name, question, topicA, topicB, topicC, avatar]
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
                form.question = form.question ? form.question.split(',') : [];
                form.topicA = form.topicA ? form.topicA.split(',') : [];
                form.topicB = form.topicB ? form.topicB.split(',') : [];
                form.topicC = form.topicC ? form.topicC.split(',') : [];
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
                form.question = form.question ? form.question.split(',') : [];
                form.topicA = form.topicA ? form.topicA.split(',') : [];
                form.topicB = form.topicB ? form.topicB.split(',') : [];
                form.topicC = form.topicC ? form.topicC.split(',') : [];
            }
            return form;
        } catch (error) {
            console.error('Error while fetching form by name:', error);
            throw error;
        }
    },

    getAllForms: async (db) => {
        try {
            const [results] = await db.execute('SELECT name, ID_Form, avatar FROM Form');
            return results;
        } catch (error) {
            console.error('Error while fetching all forms:', error);
            throw error;
        }
    },

    getAllFormsAdmin: async (db) => {
        try {
            const [results] = await db.execute('SELECT * FROM Form');
            return results;
        } catch (error) {
            console.error('Error while fetching all forms:', error);
            throw error;
        }
    },

    editFormById: async (db, formId, form) => {
        try {
            const { name, question, topicA, topicB, topicC } = form;
            await db.execute(
                'UPDATE Form SET name = ?, question = ?, topicA = ?, topicB = ?, topicC = ? WHERE ID_form = ?',
                [name, question, topicA, topicB, topicC, formId]
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
