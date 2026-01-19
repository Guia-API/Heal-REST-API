const express = require('express');
const router = express.Router();
const employee_controller = require('../controllers/employee.controller')
const validate = require('../middlewares/validate.middleware')
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const {
     validate_create_employee,
     validate_update_employee,
     validate_update_employee_status,
     validate_get_employee
} = require('../validators/employee.schema.validator')

router.post('/', authenticate, authorize('Administrador'), validate_create_employee, validate, employee_controller.create);
router.put('/:id_employee', authenticate, authorize('Administrador'), validate_update_employee, validate, employee_controller.update);
router.patch('/:id_employee', authenticate, authorize('Administrador'), validate_update_employee_status, validate, employee_controller.updateStatus);
router.get('/:id_employee', authenticate, authorize('Administrador'), validate_get_employee, validate, employee_controller.getEmployeeById);
router.get('/', authenticate, authorize('Administrador'), employee_controller.getEmployees);

module.exports = router;