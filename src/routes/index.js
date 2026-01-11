const express = require('express')

const patient_router = require('./patient.routes');
const clinical_history_router = require('./clinical_history.routes');
const employee_router = require('./employee.routes');
const auth_router = require('./auth.routes');

const router = express.Router();

router.use('/patient-management', patient_router);
router.use('/clinical-history-management', clinical_history_router);
router.use('/employee-management', employee_router);
router.use('/auth', auth_router);

router.use((req, res) => {
    res.status(404).send()
});

module.exports = router;