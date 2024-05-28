module.exports = (dbConnection) => (req, res, next) => {
    req.db = dbConnection
    next();
};
