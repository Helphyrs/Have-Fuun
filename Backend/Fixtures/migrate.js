require('dotenv').config();

const bd = require('../Services/mysql');

async function migrate() {
  const connection = await bd.connectDB();


  await connection.query(`
    CREATE TABLE IF NOT EXISTS Comments (
      ID_comment INT AUTO_INCREMENT PRIMARY KEY,
      ID_user INT,
      ID_article INT,
      content TEXT
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS Form_result (
      ID_form_result INT AUTO_INCREMENT PRIMARY KEY,
      ID_form INT,
      ID_user INT,
      result INT
    )
  `);
  connection.release();

}

migrate().then(()=> process.exit(0));
