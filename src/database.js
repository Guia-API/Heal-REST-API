const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_URL
} = process.env;

// solo para entorno development
let pool = null;

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

        if(process.env.NODE_ENV === "development"){
            console.error("Details: ", error.message)
        }

        process.exit(1);
    };
}

function getPool(){
    if(!pool){
        throw new Error(
            "❌ Error en pool no fue inicializado"
        );
    }
    return pool;
}

module.exports = {
    connectDB,
    getPool
};