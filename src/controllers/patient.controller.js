const patient_service = require("../services/patient.service");
const dotenv = require('dotenv')

let self = {};

self.create = async function (req, res) {
    try{
        const new_patient = req.body;

        const response = await patient_service.savePatient(new_patient);

        return res.status(201).json({
            message: "Paciente creado exitosamente",
            patient: response
        })

    } catch (error){
        if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al insertar al paciente en la base de datos"
            });
        }

        console.error("❌ Error en savePatient: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });

    }   
}

self.update = async function (req, res) {
    try {
        const {id_patient} = req.params
        const updated_patient = req.body;

        const response = await patient_service.updatePatient(id_patient, updated_patient)

        return res.status(200).json({
            message: "Paciente actualizado exitosamente", 
            patient: response
        })

    } catch (error){
        if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al actualizar el paciente en la base de datos"
            });
        }

        console.error("❌ Error en updatePatient: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
}

self.updateStatus = async function (req, res) {
    try{
        const {id_patient} = req.params;
        const {status} = req.body;
        
        const response = await patient_service.updateStatusPatient(id_patient, status);

        return res.status(200).json({
            message:"Paciente deshabilitado exitosamente",
            patient: response
        })

    } catch (error){
        if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al updateStatusPatient el paciente en la base de datos"
            });
        }

        console.error("❌ Error en disablePatient: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
}

self.getPatientById = async function (req, res) {
    try{

        const {id_patient} = req.params;
        
        const response = await patient_service.getPatientById(id_patient);

        if(!response) {
            return res.status(404).json({
                message: "No se ha encontrado al paciente"
            });
        }

        return res.status(200).json({
            patient: response
        })


    } catch (error) {
            if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al obtener el paciente de la base de datos"
            });
        }

        console.error("❌ Error en getPatient: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
}

self.getPatients = async function (req, res) {
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

        const response = await patient_service.getPatients(page, limit, status);

        return res.status(200).json({
            ok: true, 
            ...response
        });


    } catch (error) {
        if(process.env.NODE_ENV === "Production") {
            return res.status(500).json({
                message: "Error al obtener los pacientes"
            });
        }

        console.error("❌ Error en getPatients: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        })
    }
}

module.exports = self;
