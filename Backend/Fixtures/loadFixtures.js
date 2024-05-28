require('dotenv').config()
const userModel = require('../Models/user');
const articleModel = require('../Models/article');
const commentModel = require('../Models/comment');
const formModel = require('../Models/form');
const formResultModel = require('../Models/formResult');

const { users } = require('./data/userData');
const { articles } = require('./data/articleData');
const { comments } = require('./data/commentData');
const { forms } = require('./data/formData');
const { formResults } = require('./data/formResultData');

const bd = require('../Services/mysql');

async function loadFixtures() {
    const connection = await bd.connectDB();
    const userIds = await Promise.all(users.map(user => userModel.addUser(db, user)));
    const articleIds = await Promise.all(articles.map(article => articleModel.addArticle(db, article)));
    await Promise.all(comments.map(comment => commentModel.addComment(db, comment.userId, comment.articleId, comment.content)));
    const formIds = await Promise.all(forms.map(form => formModel.addForm(db, form)));
    await Promise.all(formResults.map(result => formResultModel.addResult(db, result.formId, result.userId, result.result)));
    console.log('Fixtures chargées avec succès.');
}

loadFixtures()
