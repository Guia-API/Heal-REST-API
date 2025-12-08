const express = require('express');
const router = express.Router();
const patient_controller = require('../controllers/patient.controller')

router.post('/', patient_controller.create);
router.put('/:id_patient', patient_controller.update)


module.exports = router;