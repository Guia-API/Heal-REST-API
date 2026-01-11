const express = require('express');
const router = express.Router();
const employee_controller = require('../controllers/employee.controller')

const {
     validate_create_employee,
     validate_update_employee,
     validate_update_employee_status,
     validate_get_employee
} = require('../validators/employee.schema.validator')

router.post('/', validate_create_employee, employee_controller.create);
router.put('/:id_employee', validate_update_employee, employee_controller.update);
router.patch('/:id_employee', validate_update_employee_status, employee_controller.updateStatus);
router.get('/:id_employee', validate_get_employee, employee_controller.getEmployeeById);
router.get('/', employee_controller.getEmployees);

module.exports = router;