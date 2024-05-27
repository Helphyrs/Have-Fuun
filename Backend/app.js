const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const dbMiddleware = require('./Middlewares/db');


const app = express()

// routes //

const userRoads = require('./Routes/userRoad');
const authRoads = require('./Routes/authRoad');
const articleRoads = require('./Routes/articleRoad');
const commentRoads = require('./Routes/commentRoad');

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(dbMiddleware);

// app.use des routes //

app.use('/api/connect', authRoads);
app.use('/api/users', userRoads);
app.use('/api/articles', articleRoads);
app.use('/api/comments', commentRoads);

module.exports = app