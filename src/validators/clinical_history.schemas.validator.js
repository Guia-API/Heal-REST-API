const { checkSchema } = require('express-validator')

const create_clinical_history_schema = {
    id_patient: {
        exists: {
            errorMessage: 'patient id is required'
        },
        isInt: {
            options: {min: 1},
            errorMessage: 'Patient id must be a valid positive interger'
        },
        toInt: true
    },

    chronic_diseases: {
        exists: {
            errorMessage: 'chronic diseases are required'
        },
        isString: {
            errorMessage: 'chronic diseases must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'chronic diseases must be between 3 and 250 characters'
        }
    },

    regular_medication: {
        exists: {
            errorMessage: 'regular medication is required'
        },
        isString: {
            errorMessage: 'regular medication must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'regular medication must be between 3 and 250 characters'
        }
    },

    observations: {
        exists: {
            errorMessage: 'observations are required'
        },
        isString: {
            errorMessage: 'observations must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'observations must be between 3 and 250 characters'
        } 
    },

    allergies: {
        exists: {
            errorMessage: 'allergies are required'
        },
        isString: {
            errorMessage: 'allergies must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'allergies must be between 3 and 250 characters'
        } 
    },

    creation_date: {
        exists: {
            errorMessage: 'Creation date is required'
        },
        isISO8601: {
            errorMessage: 'Creation date must be a valid date (YYYY-MM-DD)'
        },
        toDate: true
    },

    personal_medical_history: {
        exists: {
            errorMessage: 'Personal medical history is required'
        },
        isString: {
            errorMessage: 'Personal medical history must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'Personal medical history must be between 3 and 250 characters'
        } 
    },

    family_medical_history: {
        exists: {
            errorMessage: 'Family medical history is required'
        },
        isString: {
            errorMessage: 'Family medical history must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'Family medical history must be between 3 and 250 characters'
        } 
    }
    
}

const update_clinical_history_schema = {
    id_clinical_history:{
        in: ['params'],
        exists: {
            errorMessage: 'Clinical history id is required'
        },
        isInt: {
            options: {min: 1},
            errorMessage: 'Clinical history id mustb be a valid positive interger'
        },
        toInt: true
    },

    chronic_diseases: {
        exists: {
            errorMessage: 'chronic diseases are required'
        },
        isString: {
            errorMessage: 'chronic diseases must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'chronic diseases must be between 3 and 250 characters'
        }
    },

    regular_medication: {
        exists: {
            errorMessage: 'regular medication is required'
        },
        isString: {
            errorMessage: 'regular medication must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'regular medication must be between 3 and 250 characters'
        }
    },

    observations: {
        exists: {
            errorMessage: 'observations are required'
        },
        isString: {
            errorMessage: 'observations must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'observations must be between 3 and 250 characters'
        } 
    },

    allergies: {
        exists: {
            errorMessage: 'allergies are required'
        },
        isString: {
            errorMessage: 'allergies must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'allergies must be between 3 and 250 characters'
        } 
    },

    creation_date: {
        exists: {
            errorMessage: 'Creation date is required'
        },
        isISO8601: {
            errorMessage: 'Creation date must be a valid date (YYYY-MM-DD)'
        },
        toDate: true
    },

    personal_medical_history: {
        exists: {
            errorMessage: 'Personal medical history is required'
        },
        isString: {
            errorMessage: 'Personal medical history must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'Personal medical history must be between 3 and 250 characters'
        } 
    },

    family_medical_history: {
        exists: {
            errorMessage: 'Family medical history is required'
        },
        isString: {
            errorMessage: 'Family medical history must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'Family medical history must be between 3 and 250 characters'
        } 
    }
    
}

const get_clinical_history_schema = {
    id_patient:{
        in: ['params'],
        exists: {
            errorMessage: 'Patient id is required'
        },
        isInt: {
            options: {min: 1},
            errorMessage: 'Patient id mustb be a valid positive interger'
        },
        toInt: true
    }
};

module.exports = {
    validate_create_clinical_history: checkSchema(create_clinical_history_schema),
    validate_update_clinical_history: checkSchema(update_clinical_history_schema),
    validate_get_clinical_history: checkSchema(get_clinical_history_schema)
};