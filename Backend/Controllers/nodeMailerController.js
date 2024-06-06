const nodemailer = require('nodemailer');
require('dotenv').config;
module.exports = {
    sendMail: async (req, res) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "1f0fef8627d9d8",
                    pass: "20cd8c37dad60b"
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
            res.status(200).send("Votre email a bien été envoyé")
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de l'envoi de l'email." });
        }
    }
}