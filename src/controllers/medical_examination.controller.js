const medical_examination_service = require('../services/medical_examination.service');

let self = {};

self.create = async (req, res, next) => {
  try {
    const new_examination = req.body;

    const response =
      await medical_examination_service.saveMedicalExamination(new_examination);

    return res.status(201).json({
      message: 'Consulta médica creada exitosamente',
      medical_examination: response
    });
  } catch (error) {
    next(error);
  }
};

self.update = async (req, res, next) => {
  try {
    const { id_medical_examination } = req.params;
    const updated_examination = req.body;

    const response =
      await medical_examination_service.updateMedicalExamination(
        id_medical_examination,
        updated_examination
      );

    return res.status(200).json({
      message: 'Consulta médica actualizada exitosamente',
      medical_examination: response
    });
  } catch (error) {
    next(error);
  }
};

self.getById = async (req, res, next) => {
  try {
    const { id_medical_examination } = req.params;

    const response =
      await medical_examination_service.getMedicalExaminationById(
        id_medical_examination
      );

    if (!response) {
      return res.status(404).json({
        message: 'No se ha encontrado la consulta médica solicitada'
      });
    }

    return res.status(200).json({
      medical_examination: response
    });
  } catch (error) {
    next(error);
  }
};

self.getByMedicalHistory = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = self;