const express = require('express');
const router = express.Router();
const patient_controller = require('../controllers/patient.controller')
const validate = require('../middlewares/validate.middleware')
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const {
     validate_create_patient,
     validate_update_patient,
     validate_update_patient_status,
     validate_get_patient
} = require('../validators/patient.schema.validator')

router.post('/', authenticate, authorize('Recepcionista'), validate_create_patient, validate, patient_controller.create);
router.put('/:id_patient', authenticate, authorize('Recepcionista'), validate_update_patient, validate, patient_controller.update);
router.patch('/:id_patient', authenticate, authorize('Recepcionista'), validate_update_patient_status, validate, patient_controller.updateStatus);
router.get('/:id_patient', authenticate, authorize('Recepcionista', 'Doctor', 'Enfermera'), validate_get_patient, validate, patient_controller.getPatientById);
router.get('/', authenticate, authorize('Recepcionista', 'Doctor', 'Enfermera'), patient_controller.getPatients);
module.exports = router;