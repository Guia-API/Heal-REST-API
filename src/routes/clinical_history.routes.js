const express = require('express');
const router = express.Router();
const clinical_history_controller = require ('../controllers/clinical_history.controller');

router.post('/:id_patient', clinical_history_controller.create);
router.put('/:id_clinical_history', clinical_history_controller.update);
router.get('/:id_patient', clinical_history_controller.getById);

module.exports = router;