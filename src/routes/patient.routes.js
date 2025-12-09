const express = require('express');
const router = express.Router();
const patient_controller = require('../controllers/patient.controller')

const {
     validate_create_patient,
     validate_update_patient,
     validate_update_patient_status,
     validate_get_patient
} = require('../validators/patient.schema.validator')

router.post('/', validate_create_patient, patient_controller.create);
router.put('/:id_patient', validate_update_patient, patient_controller.update);
router.patch('/:id_patient', validate_update_patient_status, patient_controller.updateStatus);
router.get('/:id_patient', validate_get_patient, patient_controller.getPatientById);
router.get('/', patient_controller.getPatients);

module.exports = router;