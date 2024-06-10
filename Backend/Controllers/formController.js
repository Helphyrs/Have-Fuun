const formModel = require('../Models/form');

module.exports = {

    getAllForms: async (req, res) => {
        try {
            const forms = await formModel.getAllForms(req.app.locals.db);
            res.status(200).send(forms);
        } catch (error) {
            console.error('Error while fetching all forms:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    getFormById: async (req, res) => {
        try {
            const formId = req.params.formId;
            const form = await formModel.getFormById(req.app.locals.db, formId);
            form ? res.status(200).send(form) : res.status(404).send('Form not found');
        } catch (error) {
            console.error('Error while fetching form by ID:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getFormByName: async (req, res) => {
        try {
            const formName = req.params.name;
            const form = await formModel.getFormByName(req.app.locals.db, formName);
            form ? res.status(200).send(form) : res.status(404).send('Form not found');
        } catch (error) {
            console.error('Error while fetching form by name:', error);
            res.status(500).send('Internal Server Error');
        }
    }

};