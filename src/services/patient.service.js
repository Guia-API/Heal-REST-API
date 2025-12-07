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

module.exports = patient_service;