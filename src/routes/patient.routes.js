const express = require('express');
const router = express.Router();
const patient_controller = require('../controllers/patient.controller')

router.post('/', patient_controller.create);


module.exports = router;