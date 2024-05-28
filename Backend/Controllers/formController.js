const formModel = require('../Models/form');

module.exports = {
    getAllForms: async (req, res) => {
        try {
            const forms = await formModel.getAllForms(req.db);
            res.status(200).send(forms);
        } catch (error) {
            console.error('Error while fetching all forms:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getFormById: async (req, res) => {
        try {
            const formId = req.params.formId;
            const form = await formModel.getFormById(req.db, formId);
            form ? res.status(200).send(form) : res.status(404).send('Form not found');
        } catch (error) {
            console.error('Error while fetching form by ID:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getFormByName: async (req, res) => {
        try {
            const formName = req.params.name;
            const form = await formModel.getFormByName(req.db, formName);
            form ? res.status(200).send(form) : res.status(404).send('Form not found');
        } catch (error) {
            console.error('Error while fetching form by name:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    addForm: async (req, res) => {
        try {
            const form = req.body;
            const formId = await formModel.addForm(req.db, form);
            res.status(201).send(`Form added with ID: ${formId}`);
        } catch (error) {
            console.error('Error while adding form:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    editFormById: async (req, res) => {
        try {
            const formId = req.params.formId;
            const form = req.body;
            await formModel.editFormById(req.db, formId, form);
            res.status(200).send('Form updated successfully');
        } catch (error) {
            console.error('Error while updating form:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteFormById: async (req, res) => {
        try {
            const formId = req.params.formId;
            await formModel.deleteFormById(req.db, formId);
            res.status(200).send('Form deleted successfully');
        } catch (error) {
            console.error('Error while deleting form:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};