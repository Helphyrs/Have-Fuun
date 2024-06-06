const nodemailer = require('nodemailer');
require('dotenv').config;
module.exports = {
    sendMail: async (req, res) => {
        try {
            let transporter = nodemailer.createTransport({
                host: process.env.HOST_MAILER,
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.MDP
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const { objet, email, message } = req.body;

            let mailOptions = {
                from: email,
                to: process.env.EMAIL,
                subject: objet,
                text: message
            };
            await transporter.sendMail(mailOptions);

        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de l'envoi de l'email." });
        }
    }
}