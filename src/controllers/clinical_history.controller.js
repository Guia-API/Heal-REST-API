const clinical_history_service = require("../services/clinical_history.service");

let self = {};

self.create = async function (req, res) {
    try{
        const {id_patient} = req.params
        const new_clinical_history = req.body

        const response = await clinical_history_service.saveClinicalHistory(id_patient, new_clinical_history);

        return res.status(201).json({
            message: "Historial clínico creado exitosamente",
            clinical_history: response
        })

    } catch (error) {

        if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al crear el historial clínico en la base de datos"
            });
        }

        console.error("❌ Error en savePatient: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });

    }
}

self.update = async function (req, res) {
    try{

        const {id_clinical_history} = req.params;
        const updated_clinical_history = req.body;

        const response = await clinical_history_service.updateClinicalHistory(id_clinical_history, updated_clinical_history);

        return res.status(200).json({
            message: "Historial clínico actualizado exitosamente",
            clinical_history: response
        })

    } catch (error) {

        if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al actualizar el historial clínico en la base de datos"
            });
        }

        console.error("❌ Error en update clinical history controller: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });

    }
    
}

self.getById = async function (req, res) {
    try{

        const { id_patient } = req.params;
        
        const response = await clinical_history_service.getClinicialHistoryById(id_patient);

        if(!response){
            return res.status(404).json({
                message: "No se ha encontrado el historial clínico"
            });
        }
        
        return res.status(200).json({
            clinical_history: response
        });  

    } catch(error){ 
        
        if(process.env.NODE_ENV === "production"){
            return res.status(500).json({
                message: "Error al obtener el historial clínico por id en la base de datos"
            });
        }

        console.error("❌ Error en get clinical history by id controller: ", error.message);
        return res.status(500).json({
            message: "Error del servidor"
        });

    }
    
}

module.exports = self;