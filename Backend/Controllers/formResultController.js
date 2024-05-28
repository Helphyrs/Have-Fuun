const formResultModel = require('../Models/formResult');

module.exports = {
    addFormResult: async (req, res) => {
        try {
            const { formId, result } = req.body;
            const userId = req.userInfo.userId

            if (isNaN(result) || result < -10 || result > 10) {
                return res.status(400).send('Invalid result. Must be a number between -10 and 10.');
            }

            const formResultId = await formResultModel.addFormResult(req.app.locals.db, formId, userId, result);
            res.status(201).send(`Form result added with ID: ${formResultId}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};
