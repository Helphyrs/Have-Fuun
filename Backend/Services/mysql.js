const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function connectDB() {
    try {
        const connection = await pool.getConnection();
        console.log('Connecté à la base de données');
        return connection;
    } catch (error) {
        console.error('Erreur de connexion à la base de données :', error);
        throw error;
    }
}
module.exports = {
    connectDB,
    pool
}

