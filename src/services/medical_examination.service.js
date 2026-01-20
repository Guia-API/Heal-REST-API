const { getPool } = require('../database');

const medical_examination_service = {};

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
};

medical_examination_service.updateMedicalExamination = async (
  id_medical_examination,
  updated_examination
) => {
  const pool = getPool();

  const update = buildUpdateQuery(updated_examination, [
    'prescription',
    'medical_diagnosis',
    'symptoms',
    'date',
    'reason',
    'comments',
    'type'
  ]);

  if (!update.fields.length) {
    throw {
      status: 400,
      message: 'No hay campos para actualizar'
    };
  }

  const query = `
    UPDATE medical_examination
    SET ${update.fields.join(', ')}
    WHERE id_medical_examination = ?
  `;

  const [result] = await pool.query(query, [
    ...update.values,
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
};

medical_examination_service.getMedicalExaminationById = async (
  id_medical_examination
) => {
  const pool = getPool();

  const [result] = await pool.query(
    `
    SELECT *
    FROM medical_examination
    WHERE id_medical_examination = ?
    `,
    [id_medical_examination]
  );

  return result.length ? result[0] : null;
};

medical_examination_service.getMedicalExaminationsByHistory = async (
  id_medical_history
) => {
  const pool = getPool();

  const [result] = await pool.query(
    `
    SELECT *
    FROM medical_examination
    WHERE id_medical_history = ?
    ORDER BY date DESC
    `,
    [id_medical_history]
  );

  return result;
};

module.exports = medical_examination_service;