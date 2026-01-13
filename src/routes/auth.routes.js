const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth.controller');

const {
  validate_login,
  validate_refresh,
  validate_logout
} = require('../validators/auth.schema.validator');

router.post('/login', validate_login, auth_controller.login);
router.post('/refresh', validate_refresh, auth_controller.refresh);
router.post('/logout', validate_logout, auth_controller.logout);

module.exports = router;