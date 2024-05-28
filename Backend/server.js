require('dotenv').config()

const app = require('./app');
const bd = require('./Services/mysql');
const port = process.env.PORT


const startServer = async port => {
    try {
        const connection = await bd.connectDB();
        app.locals.db = connection
        app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}/api`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${port} is already in use, trying port ${parseInt(port) + 1}…`);
                startServer(parseInt(port) + 1);
            } else {
                console.error(err);
                process.exit(1);
            }
        });
    } catch (error) {
        console.error('Failed to start the server due to database connection error:', error);
        process.exit(1);
    }
}

startServer(port)