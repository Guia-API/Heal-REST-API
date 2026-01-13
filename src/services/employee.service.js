const { getPool } = require('../database');
const bcrypt = require('bcrypt');

const employee_service = {};

employee_service.saveEmployee = async (data) => {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [[existingUser]] = await connection.query(
      'SELECT id_user FROM user WHERE email = ?',
      [data.email]
    );

    if (existingUser) {
      throw { status: 409, message: 'El email ya está registrado' };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [userResult] = await connection.query(
      `INSERT INTO user (email, password) VALUES (?, ?)`,
      [data.email, hashedPassword]
    );

    const id_user = userResult.insertId;

    const [employeeResult] = await connection.query(
      `
      INSERT INTO employee (id_user, full_name, date_birth, cell_phone, rol)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        id_user,
        data.full_name,
        data.date_birth,
        data.cell_phone,
        data.rol
      ]
    );

    await connection.commit();

    return {
      id_employee: employeeResult.insertId,
      id_user,
      full_name: data.full_name,
      email: data.email,
      rol: data.rol
    };

  } catch (error) {
    await connection.rollback();

    if (error.code === 'ER_DUP_ENTRY') {
      throw { status: 409, message: 'El email ya está registrado' };
    }

    throw {
      status: error.status || 500,
      message: error.message || 'Error creando empleado'
    };
  } finally {
    connection.release();
  }
};

employee_service.updateEmployee = async (id_employee, data) => {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [[employee]] = await connection.query(
      'SELECT id_user FROM employee WHERE id_employee = ?',
      [id_employee]
    );

    if (!employee) {
      throw { status: 404, message: 'Empleado no encontrado' };
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const userUpdate = buildUpdateQuery(data, ['email', 'password']);
    if (userUpdate.fields.length) {
      await connection.query(
        `UPDATE user SET ${userUpdate.fields.join(', ')} WHERE id_user = ?`,
        [...userUpdate.values, employee.id_user]
      );
    }

    const employeeUpdate = buildUpdateQuery(
      data,
      ['full_name', 'date_birth', 'cell_phone', 'rol']
    );

    if (employeeUpdate.fields.length) {
      await connection.query(
        `UPDATE employee SET ${employeeUpdate.fields.join(', ')} WHERE id_employee = ?`,
        [...employeeUpdate.values, id_employee]
      );
    }

    await connection.commit();

    return { id_employee };

  } catch (error) {
    await connection.rollback();

    if (error.code === 'ER_DUP_ENTRY') {
      throw { status: 409, message: 'El email ya está en uso' };
    }

    throw {
      status: error.status || 500,
      message: error.message || 'Error actualizando empleado'
    };
  } finally {
    connection.release();
  }
};

employee_service.updateStatusEmployee = async (id_employee, status) => {
  const pool = getPool();

  const [result] = await pool.query(
    `
    UPDATE user u
    JOIN employee e ON e.id_user = u.id_user
    SET u.status = ?
    WHERE e.id_employee = ?
    `,
    [status, id_employee]
  );

  if (result.affectedRows === 0) {
    throw { status: 404, message: 'Empleado no encontrado' };
  }

  return { id_employee, status };
};

employee_service.getEmployeeById = async (id_employee) => {
  const pool = getPool();

  const [result] = await pool.query(
    `
    SELECT
      e.id_employee,
      e.full_name,
      e.date_birth,
      e.cell_phone,
      e.rol,
      u.email,
      u.status
    FROM employee e
    JOIN user u ON u.id_user = e.id_user
    WHERE e.id_employee = ?
    `,
    [id_employee]
  );

  return result.length ? result[0] : null;
};

employee_service.getEmployees = async (page = 1, limit = 10, status = null) => {
  const pool = getPool();
  const offset = (page - 1) * limit;

  let where = '';
  const params = [];

  if (status !== null) {
    where = 'WHERE u.status = ?';
    params.push(status === 'active' ? 1 : 0);
  }

  const [data] = await pool.query(
    `
    SELECT
      e.id_employee,
      e.full_name,
      e.rol,
      u.email,
      u.status
    FROM employee e
    JOIN user u ON u.id_user = e.id_user
    ${where}
    ORDER BY e.id_employee
    LIMIT ? OFFSET ?
    `,
    [...params, limit, offset]
  );

  const [[{ total }]] = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM employee e
    JOIN user u ON u.id_user = e.id_user
    ${where}
    `,
    params
  );

  return {
    page,
    limit,
    total,
    total_pages: Math.ceil(total / limit),
    data
  };
};

const buildUpdateQuery = (data, allowedFields) => {
  const fields = [];
  const values = [];

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      fields.push(`${field} = ?`);
      values.push(data[field]);
    }
  }

  return { fields, values };
};

module.exports = employee_service;