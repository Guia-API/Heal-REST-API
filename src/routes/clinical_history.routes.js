const express = require('express');
const router = express.Router();
const clinical_history_controller = require ('../controllers/clinical_history.controller');

router.post('/:id_patient', clinical_history_controller.create);
router.put('/:id_clinical_hisotry', clinical_history_controller.update);

module.exports = router;