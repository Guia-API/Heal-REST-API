const {getPool} = require('../database');


async function seed_appointments() {
    const pool = getPool();
    console.log("Insertando citas...");

    const [patients] = await pool.query("SELECT id_patient FROM patient");
    const [employees] = await pool.query("SELECT id_employee FROM employee");

    if (patients.length === 0 || employees.length === 0) {
        console.log("❌ No hay pacientes o empleados para crear citas.");
       return;
    }

    const appointments = [
        {
            date: "2025-01-01 10:00:00",
            id_patient: patients[0].id_patient,
            id_employee: employees[0].id_employee
        },
        {
            date: "2025-01-02 12:30:00",
            id_patient: patients[1].id_patient,
            id_employee: employees[1].id_employee
        }
    ];

    for (const a of appointments) {
        await pool.query(
            `INSERT INTO medical_appointment (date, id_patient, id_employee)
            VALUES (?, ?, ?)`,
            [a.date, a.id_patient, a.id_employee]
        );
    }

    console.log("✔ Citas insertadas");

}

module.exports = seed_appointments;
