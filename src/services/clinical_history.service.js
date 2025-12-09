const {getPool} = require('../database');

const clinical_history_service = {}

clinical_history_service.saveClinicalHistory = async (id_patient, new_clinical_history) =>{
    const pool = getPool();

    const query = `
        INSERT INTO medical_history (id_patient, chronic_diseases, regular_medication, observations, allergies, creation_date, personal_medical_history, family_medical_history)
        VALUES (?,?,?,?,?,?,?,?)
    `;

    try {
        const [result] = await pool.query(query, [
            id_patient,
            new_clinical_history.chronic_diseases,
            new_clinical_history.regular_medication,
            new_clinical_history.observations,
            new_clinical_history.allergies,
            new_clinical_history.creation_date, 
            new_clinical_history.personal_medical_history, 
            new_clinical_history.family_medical_history
        ]);

        return {
            id_clinical_history: result.insertId
        };
    } catch (error){
        throw {
            status: error.status || 500,
            message: error.message || 'Error creating new clinical history'
        };
    }

}

clinical_history_service.updateClinicalHistory = async (id_clinical_hisotry, updated_clinical_history) =>{
    const pool = getPool();

    const query = `
        UPDATE medical_history 
        SET chronic_diseases = ?, regular_medication = ?, observations = ?, allergies = ?, creation_date = ?, personal_medical_history = ?, family_medical_history = ?
        WHERE id_medical_history = ?
    `;

    try {
        const [result] = await pool.query(query, [
            updated_clinical_history.chronic_diseases,
            updated_clinical_history.regular_medication,
            updated_clinical_history.observations,
            updated_clinical_history.allergies,
            updated_clinical_history.creation_date, 
            updated_clinical_history.personal_medical_history, 
            updated_clinical_history.family_medical_history, 
            id_clinical_hisotry
        ]);

        if(result.affectedRows === 0) {
            throw {
                status: 404,
                message: `No se encontró un paciente con el ID ${id_clinical_hisotry}`
            }
        }

        return {
            id_clinical_hisotry, 
            ...updated_clinical_history
        };
    } catch (error){
        throw {
            status: error.status || 500,
            message: error.message || 'Error creating new clinical history'
        };
    }

}

module.exports = clinical_history_service;