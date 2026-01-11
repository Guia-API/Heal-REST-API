const employee_service = require("../services/employee.service");
const dotenv = require('dotenv')

let self = {};

self.create = async function (req, res) {
    try{
        const new_employee = req.body;

        const response = await employee_service.saveEmployee(new_employee);

        return res.status(201).json({
            message: "Empleado creado exitosamente",
            employee: response
        })

    } catch (error){
        if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al insertar al empleado en la base de datos"
            });
        }

        console.error("❌ Error en saveEmployee: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });

    }   
}

self.update = async function (req, res) {
    try {
        const {id_employee} = req.params
        const updated_employee = req.body;

        const response = await employee_service.updateEmployee(id_employee, updated_employee)

        return res.status(200).json({
            message: "Empleado actualizado exitosamente", 
            employee: response
        })

    } catch (error){
        if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al actualizar el empleado en la base de datos"
            });
        }

        console.error("❌ Error en updateEmployee: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
}

self.updateStatus = async function (req, res) {
    try{
        const {id_employee} = req.params;
        const {status} = req.body;
        
        const response = await employee_service.updateStatusEmployee(id_employee, status);

        return res.status(200).json({
            message:"Empleado deshabilitado exitosamente",
            employee: response
        })

    } catch (error){
        if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al updateStatusEmployee el empleado en la base de datos"
            });
        }

        console.error("❌ Error en disableEmployee: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
}

self.getEmployeeById = async function (req, res) {
    try{

        const {id_employee} = req.params;
        
        const response = await employee_service.getEmployeeById(id_employee);

        if(!response) {
            return res.status(404).json({
                message: "No se ha encontrado al empleado"
            });
        }

        return res.status(200).json({
            employee: response
        })


    } catch (error) {
            if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al obtener el empleado de la base de datos"
            });
        }

        console.error("❌ Error en getEmployee: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
}

self.getEmployees = async function (req, res) {
    try {
        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 10;
        let status = req.query.status ? req.query.status.toLowerCase : null;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        if (limit > 100) limit = 100;

        const validStatuses = ["active", "inactive"];
        if (status && !validStatuses.includes(status)){
            return res.status(400).json({
                ok: false,
                message:"El parámetro 'status' debe ser 'active' o 'inactive'"
            });
        }

        const response = await employee_service.getEmployees(page, limit, status);
        return res.status(200).json({
            ok: true, 
            ...response
        });


    } catch (error) {
        if(process.env.NODE_ENV === "Production") {
            return res.status(500).json({
                message: "Error al obtener los empleados"
            });
        }

        console.error("❌ Error en getEmployees: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        })
    }
}

module.exports = self;
