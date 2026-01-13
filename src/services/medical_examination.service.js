const { getPool } = require('../database');

const medical_examination_service = {};

medical_examination_service.saveMedicalExamination = async (new_examination) => {
  const pool = getPool();

  const query = `
    INSERT INTO medical_examination (
      id_medical_history,
      prescription,
      medical_diagnosis,
      symptoms,
      date,
      reason,
      comments,
      type
    )
    VALUES (?,?,?,?,?,?,?,?)
  `;

  try {
    const [result] = await pool.query(query, [
      new_examination.id_medical_history,
      new_examination.prescription,
      new_examination.medical_diagnosis,
      new_examination.symptoms,
      new_examination.date,
      new_examination.reason,
      new_examination.comments,
      new_examination.type
    ]);

    return {
      id_medical_examination: result.insertId
    };
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || 'Error creating medical examination'
    };
  }
};

medical_examination_service.updateMedicalExamination = async (
  id_medical_examination,
  updated_examination
) => {
  const pool = getPool();

  const query = `
    UPDATE medical_examination
    SET
      prescription = ?,
      medical_diagnosis = ?,
      symptoms = ?,
      date = ?,
      reason = ?,
      comments = ?,
      type = ?
    WHERE id_medical_examination = ?
  `;

  try {
    const [result] = await pool.query(query, [
      updated_examination.prescription,
      updated_examination.medical_diagnosis,
      updated_examination.symptoms,
      updated_examination.date,
      updated_examination.reason,
      updated_examination.comments,
      updated_examination.type,
      id_medical_examination
    ]);

    if (result.affectedRows === 0) {
      throw {
        status: 404,
        message: `No se encontró un examen médico con el ID ${id_medical_examination}`
      };
    }

    return {
      id_medical_examination,
      ...updated_examination
    };
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || 'Error updating medical examination'
    };
  }
};

medical_examination_service.getMedicalExaminationById = async (
  id_medical_examination
) => {
  const pool = getPool();

  const query = `
    SELECT *
    FROM medical_examination
    WHERE id_medical_examination = ?
  `;

  try {
    const [result] = await pool.query(query, [id_medical_examination]);

    if (result.length === 0) return false;

    return result[0];
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || 'Error obteniendo examen médico por id'
    };
  }
};

medical_examination_service.getMedicalExaminationsByHistory = async (
  id_medical_history
) => {
  const pool = getPool();

  const query = `
    SELECT *
    FROM medical_examination
    WHERE id_medical_history = ?
    ORDER BY date DESC
  `;

  try {
    const [result] = await pool.query(query, [id_medical_history]);
    return result;
  } catch (error) {
    throw {
      status: error.status || 500,
      message:
        error.message || 'Error obteniendo exámenes médicos por historial'
    };
  }
};

module.exports = medical_examination_service;