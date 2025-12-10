const {getPool} = require('../database');


const employees = [
    {
        full_name: "Dr. Roberto Gómez",
        date_birth: "1970-04-18",
        cell_phone: "2291122334",
        rol: "Doctor"
    },
    {
        full_name: "Dra. Ana Torres",
        date_birth: "1982-09-05",
        cell_phone: "2295544332",
        rol: "Doctor"
    }
];

async function seed_employees() {
    const pool = getPool();

    console.log("Insertando empleados...");

    for(const employee of employees){
        await pool.query(
            `INSERT INTO employee (full_name, date_birth, cell_phone, rol)
             VALUES (?, ?, ?, ?)`,
            [employee.full_name, employee.date_birth, employee.cell_phone, employee.rol]
        );
    }

    console.log("✔ Empleados insertados");
}

module.exports = seed_employees;