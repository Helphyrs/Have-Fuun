const formResultModel = require('../Models/formResult');

module.exports = {
    addFormResult: async (req, res) => {
        try {
            const { formId, result } = req.body;
            const userId = req.userInfo.userId
            const formResultId = await formResultModel.addFormResult(req.db, formId, userId, result);
            res.status(201).send(`Form result added with ID: ${formResultId}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};
