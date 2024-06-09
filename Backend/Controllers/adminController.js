const articleModel = require('../Models/article');
const commentModel = require('../Models/comment');
const userModel = require('../Models/user');
const formModel = require('../Models/form');
const fs = require('fs');
const path = require('path');


module.exports = {

    // ARTICLES


    getAllArticlesInfo: async (req, res) => {
        try {
            const articles = await articleModel.getAllArticlesAdmin(req.app.locals.db)
            res.status(200).send(articles);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    addArticle: async (req, res) => {
        try {
            const avatar = req.file ? req.file.filename : null;
            const article = req.body;
            article.avatar = avatar ? `public/assets/forms-articles/${avatar}` : null;
            const articleId = await articleModel.addArticle(req.app.locals.db, article);
            res.status(201).send(`Article added with ID: ${articleId}`);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    editArticleById: async (req, res) => {
        try {
            const articleId = req.params.articleId;
            const avatar = req.file ? req.file.filename : null;
            let article = await articleModel.getArticleById(req.app.locals.db, articleId);
            if (!article) return res.status(404).send('Article not found');

            const articlesCount = await articleModel.getArticlesCountByAvatar(req.app.locals.db, article.avatar);
            const formCount = await formModel.getFormCountByAvatar(req.app.locals.db, article.avatar);
            const sum = formCount + articlesCount

            if (req.body.name === "" || req.body.description === "" || req.body.tags === "" || req.body.avatar === "") {
                if (req.body.name === "") req.body.name = article.name;
                if (req.body.description === "") req.body.description = article.description;
                if (req.body.tags === "") req.body.tags = article.tags;
            }
            req.body.avatar = avatar ? `public/assets/forms-articles/${avatar}` : null;
            const articleBody = req.body
            if (sum <= 1) {
                const filePath = path.join(__dirname, '../', article.avatar);
                fs.unlink(filePath, async (err) => {
                    if (err) {
                        console.error('Error while deleting file:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                    try {
                        await articleModel.editArticleById(req.app.locals.db, articleId, articleBody);
                        res.status(200).send('Article edited successfully');
                    } catch (error) {
                        console.error('Error while editing article from database:', error);
                        res.status(500).send('Internal Server Error');
                    }
                });
            } else {
                await articleModel.editArticleById(req.app.locals.db, articleId, articleBody)
                res.status(200).send('Article updated successfully');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    deleteArticleById: async (req, res) => {
        try {
            const articleId = req.params.articleId;
            const article = await articleModel.getAvatarById(req.app.locals.db, articleId);
            if (!article) return res.status(404).send('Article not found');

            const articlesCount = await articleModel.getArticlesCountByAvatar(req.app.locals.db, article.avatar);
            const formCount = await formModel.getFormCountByAvatar(req.app.locals.db, article.avatar);
            const sum = formCount + articlesCount

            if (sum <= 1) {
                const filePath = path.join(__dirname, '../', article.avatar);
                fs.unlink(filePath, async (err) => {
                    if (err) {
                        console.error('Error while deleting file:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                    try {
                        await articleModel.deleteArticleById(req.app.locals.db, articleId);
                        res.status(200).send('Article deleted successfully');
                    } catch (error) {
                        console.error('Error while deleting article from database:', error);
                        res.status(500).send('Internal Server Error');
                    }
                });
            } else {
                await articleModel.deleteArticleById(req.app.locals.db, articleId);
                res.status(200).send('Article deleted successfully');
            }

        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    // COMMENTS

    getAllComments: async (req, res) => {
        try {
            const comments = await commentModel.getAllComments(req.app.locals.db);
            res.status(200).send(comments);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteCommentByAdmin: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            await commentModel.deleteComment(req.app.locals.db, commentId);
            res.status(200).send('Comment deleted successfully by admin');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },



    // USERS

    getAllInfoUserAdmin: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await userModel.getUserById(req.app.locals.db, userId);
            const comment = await userModel.getCommentsWithArticleNameByUserId(req.app.locals.db, userId);
            const formResult = await userModel.getFormResultsWithFormNameByUserId(req.app.locals.db, userId);
            user ? res.status(200).send({ user, comment, formResult }) : res.status(404).send('Info user not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    isAdmin: async (req, res) => {
        try {
            res.status(200).send(true);
        } catch (error) {
            res.status(500).send('Internal Server Error');

        }
    },
    getAllUsers: async (req, res) => {
        try {
            const user = await userModel.getAllUsers(req.app.locals.db);
            user ? res.status(200).send(user) : res.status(404).send('Info user not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await userModel.getUserById(req.app.locals.db, userId);
            user ? res.status(200).send(user) : res.status(404).send('User not found');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const userId = parseInt(req.params.userId);
            await userModel.deleteUserById(req.app.locals.db, userId);
            res.status(200).send('User deleted successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },

    // FORMS

    getAllFormsAdmin: async (req, res) => {
        try {
            const forms = await formModel.getAllFormsAdmin(req.app.locals.db);
            res.status(200).send(forms);
        } catch (error) {
            console.error('Error while fetching all forms:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    addForm: async (req, res) => {
        try {
            const form = req.body;
            const avatar = req.file ? req.file.filename : null;
            form.avatar = avatar ? `public/assets/forms-articles/${avatar}` : null;
            const formId = await formModel.addForm(req.app.locals.db, form);
            res.status(201).send(`Form added with ID: ${formId}`);
        } catch (error) {
            console.error('Error while adding form:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    editFormById: async (req, res) => {
        try {
            const formId = req.params.formId;
            const avatar = req.file ? req.file.filename : null;
            const form = await formModel.getFormById(req.app.locals.db, formId);
            if (!form) return res.status(400).send('Form not found');

            const formCount = await formModel.getFormCountByAvatar(req.app.locals.db, form.avatar);
            const articlesCount = await articleModel.getArticlesCountByAvatar(req.app.locals.db, form.avatar);
            const sum = formCount + articlesCount
            req.body.avatar = avatar ? `public/assets/forms-articles/${avatar}` : null;
            const formBody = req.body;
            if (sum <= 1) {
                const filePath = path.join(__dirname, '../', form.avatar);
                fs.unlink(filePath, async (err) => {
                    if (err) {
                        console.error('Error while deleting file:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                    try {
                        await formModel.editFormById(req.app.locals.db, formId, formBody);
                        res.status(200).send('Form edited successfully');
                    } catch (error) {
                        console.error('Error while editing form from database:', error);
                        res.status(500).send('Internal Server Error');
                    }
                });
            } else {
                await articleModel.editArticleById(req.app.locals.db, formId, formBody)
                res.status(200).send('Form updated successfully');
            }
        } catch (error) {
            console.error('Error while updating form:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteFormById: async (req, res) => {
        try {
            const formId = req.params.formId;
            let form = await formModel.getFormAvatarById(req.app.locals.db, formId);
            if (!form) return res.status(404).send('Form not found');

            const formCount = await articleModel.getFormCountByAvatar(req.app.locals.db, form.avatar);
            const articlesCount = await articleModel.getArticlesCountByAvatar(req.app.locals.db, article.avatar);
            const sum = formCount + articlesCount;

            if (sum <= 1) {
                const filePath = path.join(__dirname, '../', form.avatar);
                fs.unlink(filePath, async (err) => {
                    if (err) {
                        console.error('Error while deleting file:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                    await formModel.deleteFormById(req.app.locals.db, formId);
                    res.status(200).send('Form deleted successfully');
                });
            } else {
                await formModel.deleteFormById(req.app.locals.db, formId);
                res.status(200).send('Form deleted successfully');
            }
        } catch (error) {
            console.error('Error while deleting form:', error);
            res.status(500).send('Internal Server Error');
        }
    }

};
