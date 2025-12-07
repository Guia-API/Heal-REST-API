const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_URL = process.env.DB_URL; // solo para entorno development
let pool;

async function connectDB() {
    try {
        if (process.env.NODE_ENV === "development"){
            pool = mysql.createPool(DB_URL);
        
        } else if (process.env.NODE_ENV === "test"){
            pool = mysql.createPool(`${DB_URL}_test`);

        } else{
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
        }

        const connection = await pool.getConnection();
        connection.release();
    
        console.log(`✅ Database connected ➡︎ ${process.env.NODE_ENV}`)
    
    } catch(error) {
        console.error("❌ Error in database");
        process.exit(1);
    };
}

module.exports = {
    connectDB,
    getPool: () => pool
};