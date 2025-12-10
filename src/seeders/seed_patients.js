const {getPool} = require('../database');


const patients = [
    {
        full_name: "Juan Pérez",
        email: "juan@example.com",
        status: 1,
        address: "Calle 123",
        date_birth: "1985-05-10"
    },
    {
        full_name: "María López",
        email: "maria@example.com",
        status: 1,
        address: "Av Reforma 456",
        date_birth: "1990-11-22"
    }
];

async function seed_patients() {

    const pool = getPool();

    console.log ("Insertando pacientes...");

    for(const patient of patients) {
        await pool.query(
            `INSERT INTO patient (full_name, email, status, address, date_birth)
             VALUES (?, ?, ?, ?, ?)`,
            [patient.full_name, patient.email, patient.status, patient.address, patient.date_birth]
        );
    }
    
    console.log("✔ Pacientes insertados");
}

module.exports = seed_patients;