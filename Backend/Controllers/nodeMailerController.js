const nodemailer = require('nodemailer');
require('dotenv').config;
module.exports = {
    sendMail: async (req, res) => {
        try {
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "c5984f754fc01d",
                    pass: "eb93ca9131e0cf"
                }
            });

            const { objet, email, message } = req.body;

            let mailOptions = {
                from: email,
                to: process.env.EMAIL,
                subject: objet,
                text: message
            };
            await transport.sendMail(mailOptions);
            res.status(200).send("Votre email a bien été envoyé")
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de l'envoi de l'email." });
        }
    }
}