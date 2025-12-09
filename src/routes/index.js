const express = require('express')

const patient_router = require('./patient.routes');
const clinical_history_router = require('./clinical_history.routes');

const router = express.Router();

router.use('/patient-managment', patient_router);
router.use('/clinical-history-managment', clinical_history_router);

router.use((req, res) => {
    res.status(404).send()
});

module.exports = router;