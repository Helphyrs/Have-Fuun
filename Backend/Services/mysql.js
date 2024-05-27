const mysql2 = require('mysql2/promise');

async function connectDB() {
    try {
        const connection = await mysql2.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        });
        console.log('Connecté à la base de données');
        return connection; // Retourne la connexion établie
    } catch (error) {
        console.error('Erreur de connexion à la base de données :', error);
        throw error; // Propage l'erreur à l'appelant
    }
}
module.exports = {
    connectDB
}

