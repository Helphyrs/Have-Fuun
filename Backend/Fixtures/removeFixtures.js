require('dotenv').config()
const bd = require('../Services/mysql');

async function removeFixtures() {
    const connection = await bd.connectDB();
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE Articles');
    await connection.query('TRUNCATE TABLE Users');
    await connection.query('TRUNCATE TABLE Form');
    await connection.query('TRUNCATE TABLE Comments');
    await connection.query('TRUNCATE TABLE Form_result');

    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Tables vidées et identifiants réinitialisés.');
    connection.release();
}
removeFixtures()