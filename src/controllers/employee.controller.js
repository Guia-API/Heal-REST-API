const employee_service = require("../services/employee.service");

let self = {};

self.create = async (req, res, next) => {
    try {
        const new_employee = req.body;
        const response = await employee_service.saveEmployee(new_employee);

        return res.status(201).json({
            message: "Empleado creado exitosamente",
            employee: response
        });

    } catch (error) {
        next(error);
    }
};

self.update = async (req, res, next) => {
    try {
        const { id_employee } = req.params;
        const updated_employee = req.body;

        const response = await employee_service.updateEmployee(
            id_employee,
            updated_employee
        );

        return res.status(200).json({
            message: "Empleado actualizado exitosamente",
            employee: response
        });

    } catch (error) {
        next(error);
    }
};

self.updateStatus = async (req, res, next) => {
    try {
        const { id_employee } = req.params;
        const { status } = req.body;

        const response = await employee_service.updateStatusEmployee(
            id_employee,
            status
        );

        return res.status(200).json({
            message: "El estado del empleado ha sido actualizado exitosamente",
            employee: response
        });

    } catch (error) {
        next(error);
    }
};

self.getEmployeeById = async (req, res, next) => {
    try {
        const { id_employee } = req.params;
        const response = await employee_service.getEmployeeById(id_employee);

        if (!response) {
            return res.status(404).json({
                message: "No se ha encontrado al empleado"
            });
        }

        return res.status(200).json({ employee: response });

    } catch (error) {
        next(error);
    }
};

self.getEmployees = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 10;
        let status = req.query.status
            ? req.query.status.toLowerCase()
            : null;

        const validStatuses = ["active", "inactive"];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                message: "El parámetro 'status' debe ser 'active' o 'inactive'"
            });
        }

        const response = await employee_service.getEmployees(
            page,
            limit,
            status
        );

        return res.status(200).json({
            ok: true,
            ...response
        });

    } catch (error) {
        next(error);
    }
};

module.exports = self;
