const express = require('express');
const router = express.Router();
const patient_controller = require('../controllers/patient.controller')

router.post('/', patient_controller.create);
router.put('/:id_patient', patient_controller.update);
router.patch('/:id_patient', patient_controller.updateStatus);
router.get('/:id_patient', patient_controller.getPatientById);
router.get('/', patient_controller.getPatients);

module.exports = router;