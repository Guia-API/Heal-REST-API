const clinical_history_service = require('../services/clinical_history.service');

const self = {};

self.create = async (req, res, next) => {
  try {
    const { id_patient } = req.params;
    const new_clinical_history = req.body;

    const response =
      await clinical_history_service.saveClinicalHistory(
        id_patient,
        new_clinical_history
      );

    return res.status(201).json({
      message: 'Historial clínico creado exitosamente',
      clinical_history: response
    });
  } catch (error) {
    next(error);
  }
};

self.update = async (req, res, next) => {
  try {
    const { id_clinical_history } = req.params;
    const updated_clinical_history = req.body;

    const response =
      await clinical_history_service.updateClinicalHistory(
        id_clinical_history,
        updated_clinical_history
      );

    return res.status(200).json({
      message: 'Historial clínico actualizado exitosamente',
      clinical_history: response
    });
  } catch (error) {
    next(error);
  }
};

self.getById = async (req, res, next) => {
  try {
    const { id_patient } = req.params;

    const response =
      await clinical_history_service.getClinicialHistoryById(id_patient);

    if (!response) {
      return res.status(404).json({
        message: 'No se ha encontrado el historial clínico'
      });
    }

    return res.status(200).json({
      clinical_history: response
    });
  } catch (error) {
    next(error);
  }
};

module.exports = self;