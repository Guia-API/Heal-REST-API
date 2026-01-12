const e = require('express');
const { getPool } = require('../database');
const bcrypt = require('bcrypt');

const employee_service = {};

employee_service.saveEmployee = async (data) => {
  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userQuery = `
      INSERT INTO user (email, password)
      VALUES (?, ?)
    `;

    const [userResult] = await connection.query(userQuery, [
      data.email,
      hashedPassword
    ]);

    const id_user = userResult.insertId;

    const employeeQuery = `
      INSERT INTO employee (
        id_user,
        full_name,
        date_birth,
        cell_phone,
        rol
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const [employeeResult] = await connection.query(employeeQuery, [
      id_user,
      data.full_name,
      data.date_birth,
      data.cell_phone,
      data.rol
    ]);

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

    const getUserQuery = `
      SELECT id_user
      FROM employee
      WHERE id_employee = ?
    `;

    const [[employee]] = await connection.query(getUserQuery, [id_employee]);

    if (!employee) {
      throw { status: 404, message: 'Empleado no encontrado' };
    }

    const id_user = employee.id_user;

    if (data.email || data.password) {
      const userFields = [];
      const userValues = [];

      if (data.email) {
        userFields.push('email = ?');
        userValues.push(data.email);
      }

      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        userFields.push('password = ?');
        userValues.push(hashedPassword);
      }

      const userQuery = `
        UPDATE user
        SET ${userFields.join(', ')}
        WHERE id_user = ?
      `;

      await connection.query(userQuery, [...userValues, id_user]);
    }

    const employeeQuery = `
      UPDATE employee
      SET
        full_name = ?,
        date_birth = ?,
        cell_phone = ?,
        rol = ?
      WHERE id_employee = ?
    `;

    await connection.query(employeeQuery, [
      data.full_name,
      data.date_birth,
      data.cell_phone,
      data.rol,
      id_employee
    ]);

    await connection.commit();

    return {
      id_employee,
      id_user,
      full_name: data.full_name,
      email: data.email,
      rol: data.rol
    };

  } catch (error) {
    await connection.rollback();
    throw {
      status: error.status || 500,
      message: error.message || 'Error actualizando empleado'
    };
  } finally {
    connection.release();
  }
};


employee_service.getEmployeeById = async (id_employee) => {
  try {
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

  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || 'Error obteniendo empleado por ID'
    };
  }
};

employee_service.getEmployees = async (page = 1, limit = 10, status = null) => {
  try {
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

  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || 'Error obteniendo lista de empleados'
    };
  }
};

module.exports = employee_service;
