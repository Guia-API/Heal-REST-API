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
                message: "Error al deshabilitar el paciente en la base de datos"
            });
        }

        console.error("❌ Error en disablePatient: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
}

module.exports = self;
