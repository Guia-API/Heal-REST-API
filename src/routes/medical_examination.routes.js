const express = require('express');
const router = express.Router();
const medical_examination_controller = require('../controllers/medical_examination.controller');

const {
  validate_create_medical_examination,
  validate_update_medical_examination,
  validate_get_medical_examination,
  validate_get_medical_examinations_by_history
} = require('../validators/medical_examination.schema.validator');

router.post('/', validate_create_medical_examination, medical_examination_controller.create);
router.put('/:id_medical_examination', validate_update_medical_examination, medical_examination_controller.update);
router.get('/:id_medical_examination', validate_get_medical_examination, medical_examination_controller.getById);
router.get('/history/:id_medical_history', validate_get_medical_examinations_by_history, medical_examination_controller.getByMedicalHistory);

module.exports = router;
