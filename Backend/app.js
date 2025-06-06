const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

// routes //

const userRoads = require('./Routes/userRoad');
const authRoads = require('./Routes/authRoad');
const articleRoads = require('./Routes/articleRoad');
const commentRoads = require('./Routes/commentRoad');
const formRoads = require('./Routes/formRoad');
const formResultRoads = require('./Routes/formResultRoad');
const adminRoads = require('./Routes/adminRoad');
const nodeMailerRoads = require('./Routes/nodeMailerRoad');

app.use('/public', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:4200', // ou '*' pour tout autoriser (non recommandé en prod)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))
app.use(helmet())


// app.use des routes //
app.use('/api/admin', adminRoads)
app.use('/api/connect', authRoads);
app.use('/api/users', userRoads);
app.use('/api/articles', articleRoads);
app.use('/api/comments', commentRoads);
app.use('/api/forms', formRoads);
app.use('/api/form-result', formResultRoads)
app.use('/api/mailer', nodeMailerRoads)

module.exports = app