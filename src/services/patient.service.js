const { getPool } = require('../database');

const patient_service = {}

patient_service.savePatient = async (new_patient) => {
    const pool = getPool();

    const query = `
        INSERT INTO patient (full_name, email, address,  date_birth)
        VALUES (?,?,?,?)
    `;

    try{
        const [result] = await pool.query(query, [
            new_patient.full_name,
            new_patient.email,
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

patient_service.updateStatusPatient = async (id_patient, status) => {
    const pool = getPool();
    const connection = await pool.getConnection();

    try{

        await connection.beginTransaction();

        const query_patient = `
            UPDATE patient
            SET status = ?
            WHERE id_patient = ?
        `;

        const [patient_result] = await connection.query(query_patient, [status, id_patient]);

        if (patient_result.affectedRows === 0) {
            throw {
                status: 404,
                message: `No se encontró un paciente con el ID ${id_patient}`
            };
        }

        const query_clinical_history = `
            UPDATE medical_history
            SET status = ?
            WHERE id_patient = ?
        `;

        const [clinical_hirtoy_result] = await connection.query(query_clinical_history, [status, id_patient]);

        await connection.commit();

        return {
            id_patient,
            status,
            updated_medical_history: clinical_hirtoy_result.affectedRows > 0
        };

    } catch (error) {
        await connection.rollback();
        throw {
            status: error.status || 500,
            message: error.message || 'Error creating new patient'
        };
    } finally {
        connection.release();
    }
}


patient_service.getPatientById = async (id_patient) => {
    const pool = getPool();

    const query = 'SELECT * FROM patient WHERE id_patient = ?'

    try {
        const [result] = await pool.query( query, [id_patient]);

        if(result.lenght === 0) return false;

        return result[0];

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Error obteniendo paciente por id'
        };
    }
}

patient_service.getPatients = async (page = 1, limit = 10, status = null) => {
    try{
    
        const pool = getPool();

        const offset = (page - 1) * limit;

        let baseQuery = `
            FROM patient
            WHERE 1=1
        `;

        const params = [];

        if (status !== null) {
            baseQuery += `AND status = ?`;
            params.push(status);
        }

        const query = `
            SELECT
                id_patient, 
                full_name,
                email,
                address,
                date_birth,
                status
            ${baseQuery}
            ORDER BY id_patient ASC
            LIMIT ? OFFSET ?
        `

        const queryParams = [...params, limit, offset];

        const countQuery = `
            SELECT COUNT(*) AS total
            ${baseQuery}
        `

        const [patients] = await pool.query(query, queryParams);
        const [[{total}]] = await pool.query (countQuery, params);

        return {
            page,
            limit,
            status: status === null ? "all" : (status === 1 ? "active" : "inactive"),
            total,
            total_pages: Math.ceil(total / limit),
            data: patients
        };

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Error obteniendo paciente por id'
        };
    }
}

module.exports = patient_service;