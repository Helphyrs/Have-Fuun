const sanitizeHtml = require('sanitize-html')

const sanitize = (req, res, next) => {
    Object.keys(req.body).forEach(field => {
        if (typeof req.body[field] === 'string') {
            req.body[field] = sanitizeHtml(req.body[field])
        }
    })
    Object.keys(req.params).forEach(field => {
        if (typeof req.params[field] === 'string') {
            req.params[field] = sanitizeHtml(req.params[field])
        }
    })
    next()
}

module.exports = { sanitize }