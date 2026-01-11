const medical_examination_service = require('../services/medical_examination.service');
const dotenv = require('dotenv');

let self = {};

self.create = async function (req, res) {
  try {
    const new_examination = req.body;

    const response =
      await medical_examination_service.saveMedicalExamination(new_examination);

    return res.status(201).json({
      message: 'Examen médico creado exitosamente',
      medical_examination: response
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({
        message: 'Error al insertar el examen médico en la base de datos'
      });
    }

    console.error('❌ Error en saveMedicalExamination:', error.message);
    return res.status(500).json({
      message: 'Error del servidor'
    });
  }
};

self.update = async function (req, res) {
  try {
    const { id_medical_examination } = req.params;
    const updated_examination = req.body;

    const response =
      await medical_examination_service.updateMedicalExamination(
        id_medical_examination,
        updated_examination
      );

    return res.status(200).json({
      message: 'Examen médico actualizado exitosamente',
      medical_examination: response
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({
        message: 'Error al actualizar el examen médico en la base de datos'
      });
    }

    console.error('❌ Error en updateMedicalExamination:', error.message);
    return res.status(500).json({
      message: 'Error del servidor'
    });
  }
};

self.getById = async function (req, res) {
  try {
    const { id_medical_examination } = req.params;

    const response =
      await medical_examination_service.getMedicalExaminationById(
        id_medical_examination
      );

    if (!response) {
      return res.status(404).json({
        message: 'No se ha encontrado el examen médico'
      });
    }

    return res.status(200).json({
      medical_examination: response
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({
        message: 'Error al obtener el examen médico de la base de datos'
      });
    }

    console.error('❌ Error en getMedicalExaminationById:', error.message);
    return res.status(500).json({
      message: 'Error del servidor'
    });
  }
};

self.getByMedicalHistory = async function (req, res) {
  try {
    const { id_medical_history } = req.params;

    const response =
      await medical_examination_service.getMedicalExaminationsByHistory(
        id_medical_history
      );

    return res.status(200).json({
      total: response.length,
      medical_examinations: response
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({
        message: 'Error al obtener los exámenes médicos'
      });
    }

    console.error(
      '❌ Error en getMedicalExaminationsByHistory:',
      error.message
    );
    return res.status(500).json({
      message: 'Error del servidor'
    });
  }
};

module.exports = self;
