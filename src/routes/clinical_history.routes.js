const express = require('express');
const router = express.Router();
const clinical_history_controller = require ('../controllers/clinical_history.controller');

const {
    create_clinical_history_schema,
    update_clinical_history_schema,
    get_clinical_history_schema
} = require('../validators/clinical_history.schemas.validator')

router.post('/:id_patient', create_clinical_history_schema, clinical_history_controller.create);
router.put('/:id_clinical_history', update_clinical_history_schema, clinical_history_controller.update);
router.get('/:id_patient', get_clinical_history_schema, clinical_history_controller.getById);

module.exports = router;