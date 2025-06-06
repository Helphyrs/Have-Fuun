const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: process.env.DOCKER_DB_HOST,
    user: process.env.DOCKER_DB_USER,
    password: process.env.DOCKER_DB_PASSWORD,
    database: process.env.DOCKER_DB_NAME,
    waitForConnections: true,
    port: process.env.DOCKER_DB_PORT,
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

