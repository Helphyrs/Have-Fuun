require('dotenv').config()
const bcrypt = require('bcrypt');

const userModel = require('../Models/user');
const articleModel = require('../Models/article');
const commentModel = require('../Models/comment');
const formModel = require('../Models/form');
const formResultModel = require('../Models/formResult');

const { users } = require('./data/usersData');
const { articles } = require('./data/articleData');
const { comments } = require('./data/commentData');
const { forms } = require('./data/formData');
const { formResults } = require('./data/formResultData');

const bd = require('../Services/mysql');

async function loadFixtures() {
    const connection = await bd.connectDB();
    // await Promise.all(users.map(async user => {
    //     user.password = await bcrypt.hash(user.password, 10);
    //     userModel.addUser(connection, user, user.role)
    // }));
    await Promise.all(articles.map(article => articleModel.addArticle(connection, article)));
    await Promise.all(comments.map(comment => commentModel.addComment(connection, comment.userId, comment.articleId, comment.content)));
    await Promise.all(forms.map(form => formModel.addForm(connection, form)));
    await Promise.all(formResults.map(result => formResultModel.addFormResult(connection, result.formId, result.userId, result.result)));
    console.log('Fixtures chargées avec succès.');
    connection.release();

}

loadFixtures().then(() => process.exit(0))
