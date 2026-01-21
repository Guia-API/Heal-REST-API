const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT, 
    NODE_ENV
} = process.env;

let pool = null;
const MAX_RETRIES = 10;
const RETRY_DELAY = 3000;

async function connectDB() {
    for(let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            pool = mysql.createPool({
                host: DB_HOST, 
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME,
                port: DB_PORT,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });

            const connection = await pool.getConnection();
            connection.release();
            return;

        } catch(error) {
            if(attempt === MAX_RETRIES) {
                if(NODE_ENV === "development"){
                console.error("Details: ", error.message)
            }

            process.exit(1);
            }

            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        };
    }
}

function getPool(){
    if(!pool){
        throw new Error("❌ Error en pool no fue inicializado");
    }
    return pool;
}

module.exports = {
    connectDB,
    getPool
};