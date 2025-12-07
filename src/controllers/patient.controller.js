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

module.exports = self;
