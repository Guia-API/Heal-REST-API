const patient_service = require('../services/patient.service');

const self = {};

self.create = async (req, res, next) => {
    try {
        const new_patient = req.body;

        const response = await patient_service.savePatient(new_patient);

        return res.status(201).json({
            message: 'Paciente creado exitosamente',
            patient: response
        });
    } catch (error) {
        next(error);
    }
};

self.update = async (req, res, next) => {
    try {
        const { id_patient } = req.params;
        const updated_patient = req.body;

        const response =
            await patient_service.updatePatient(id_patient, updated_patient);

        return res.status(200).json({
            message: 'Paciente actualizado exitosamente',
            patient: response
        });
    } catch (error) {
        next(error);
    }
};

self.updateStatus = async (req, res, next) => {
    try {
        const { id_patient } = req.params;
        const { status } = req.body;

        const response =
            await patient_service.updateStatusPatient(id_patient, status);

        return res.status(200).json({
            message: 'Paciente deshabilitado exitosamente',
            patient: response
        });
    } catch (error) {
        next(error);
    }
};

self.getPatientById = async (req, res, next) => {
    try {
        const { id_patient } = req.params;

        const response = await patient_service.getPatientById(id_patient);

        if (!response) {
            return res.status(404).json({
                message: 'No se ha encontrado al paciente'
            });
        }

        return res.status(200).json({
            patient: response
        });
    } catch (error) {
        next(error);
    }
};

self.getPatients = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 10;
        let status =
            req.query.status !== undefined ? Number(req.query.status) : null;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        if (limit > 100) limit = 100;

        const validStatuses = [1, 0];
        if (status !== null && !validStatuses.includes(status)) {
            return res.status(400).json({
                message: "El parámetro 'status' debe ser 1 o 0"
            });
        }

        const response =
            await patient_service.getPatients(page, limit, status);

        return res.status(200).json({
            ok: true,
            ...response
        });
    } catch (error) {
        next(error);
    }
};

module.exports = self;
