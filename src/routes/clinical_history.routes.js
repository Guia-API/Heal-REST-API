const express = require('express');
const router = express.Router();
const clinical_history_controller = require ('../controllers/clinical_history.controller');

const {
    validate_create_clinical_history,
    validate_update_clinical_history,
    validate_get_clinical_history
} = require('../validators/clinical_history.schemas.validator');

router.post('/:id_patient', validate_create_clinical_history, clinical_history_controller.create);
router.put('/:id_clinical_history', validate_update_clinical_history, clinical_history_controller.update);
router.get('/:id_patient', validate_get_clinical_history, clinical_history_controller.getById);

module.exports = router;