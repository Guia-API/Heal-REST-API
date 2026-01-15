const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware')

const {
  validate_login,
} = require('../validators/auth.schema.validator');

router.post('/login', validate_login, validate, auth_controller.login);
router.post('/refresh', auth_controller.refresh);
router.post('/logout',auth_controller.logout);

module.exports = router;