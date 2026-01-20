const { connectDB, getPool } = require("./database");
const seed_patients = require("./seeders/seed_patients");
const seed_employees = require("./seeders/seed_employee");
const seed_appointments = require ("./seeders/seed_appointments");

async function run_seeders() {
    try{
        await connectDB();

        await seed_patients();
        await seed_employees();
        await seed_appointments();

        console.log("✔  Seeders ejecutados");
    } catch(err) {
        console.error("❌ Error ejecutando seeders: ", err.message);
    } finally {
        const pool = getPool();
        pool.end();
    }
}

run_seeders();