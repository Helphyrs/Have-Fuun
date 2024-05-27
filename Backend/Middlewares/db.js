module.exports = (req, next) => {
    req.db = req.app.locals.db;
    next();
};