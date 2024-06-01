const { getRoleById } = require('../Models/user');

const admin = async (req, res, next) => {
    try {
        const userId = req.userInfo.userId;
        const user = await getRoleById(req.app.locals.db, userId);
        if (user && user.role === 1) {
            next();
        } else {
            res.status(403).send('Access forbidden: Admins only');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { admin };



