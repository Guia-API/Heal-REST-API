const { getPool } = require('../database');

const patient_service = {}

patient_service.savePatient = async (new_patient) => {
    const pool = getPool();

    const query = `
        INSERT INTO patient (full_name, email, status, address,  date_birth)
        VALUES (?,?,?,?,?)
    `;

    try{
        const [result] = await pool.query(query, [
            new_patient.full_name,
            new_patient.email,
            new_patient.status || 'active',
            new_patient.address,
            new_patient.date_birth
        ]);

        return {
            id_patient: result.insertId,
        };

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Error creating new patient'
        };
    }
}

patient_service.updatePatient = async (id_patient, updated_patient) => {
    const pool = getPool();

    const query = `
        UPDATE patient
        SET full_name = ?, email = ?, address = ?, date_birth = ?
        WHERE id_patient = ?
    `;

    try{
        const [result] = await pool.query(query, [
            updated_patient.full_name,
            updated_patient.email,
            updated_patient.address,
            updated_patient.date_birth,
            id_patient
        ]);

        if (result.affectedRows === 0) {
            throw {
                status: 404,
                message: `No se encontró un paciente con el ID ${id_patient}`
            };
        }

        return {
            id_patient,
            ...updated_patient
        };

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Error creating new patient'
        };
    }
}

patient_service.getPatientById = async (id_patient) => {
    const pool = getPool;

    const query = 'SELECT * FROM patient WHERE id_patient = ?'

    try {
        const [rows] = await pool.query( query, [id_patient]);

        if(rows.lenght === 0) return false;
        return rows[0];
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Error obteniendo paciente por id'
        };
    }
}

module.exports = patient_service;