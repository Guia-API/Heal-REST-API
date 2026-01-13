const { getPool } = require('../database');
const bcrypt = require('bcrypt');

const employees = [
  {
    full_name: "Dr. Roberto Gómez",
    date_birth: "1970-04-18",
    cell_phone: "2291122334",
    rol: "Doctor",
    email: "roberto.gomez@clinic.com",
    password: "@123456Patito"
  },
  {
    full_name: "Dra. Ana Torres",
    date_birth: "1982-09-05",
    cell_phone: "2295544332",
    rol: "Doctor",
    email: "ana.torres@clinic.com",
    password: "@123456Patito"
  }
];

async function seed_employees() {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    console.log("Insertando empleados y usuarios...");
    await connection.beginTransaction();

    for (const employee of employees) {

      const hashedPassword = await bcrypt.hash(employee.password, 10);

      // 1️⃣ Crear usuario
      const [userResult] = await connection.query(
        `INSERT INTO user (email, password, status)
         VALUES (?, ?, 1)`,
        [employee.email, hashedPassword]
      );

      const id_user = userResult.insertId;

      // 2️⃣ Crear empleado
      await connection.query(
        `INSERT INTO employee (
          id_user,
          full_name,
          date_birth,
          cell_phone,
          rol
        ) VALUES (?, ?, ?, ?, ?)`,
        [
          id_user,
          employee.full_name,
          employee.date_birth,
          employee.cell_phone,
          employee.rol
        ]
      );
    }

    await connection.commit();
    console.log("✔ Empleados y usuarios insertados correctamente");

  } catch (error) {
    await connection.rollback();
    console.error("❌ Error insertando empleados:", error);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = seed_employees;