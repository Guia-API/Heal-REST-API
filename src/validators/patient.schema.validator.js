const { checkSchema } = require('express-validator');
const { options } = require('../routes/patient.routes');

const create_patient_schema = {
    full_name: {
        exists: {
            errorMessage: 'Full name is required'
        },
        isString: {
            errorMessage: 'Full name must be a String'
        }, 
        trim: true,
        isLength: {
            Ootions: { min: 3, max: 250},
            errorMessage: 'Full name must be between 3 and 250 characters'
        }
    }, 

    email: {
        exists: {
            errorMessage: 'Email is required'
        },
        isEmail: {
            errorMessage: 'Invalid email format'
        }
    },

    address: {
        exists: {
            errorMessage: 'Address is required'
        },
        isString: {
            errorMessage: 'Address must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'Address must be between 3 and 250 characters'
        }
    },

    date_birth: {
        exists: {
            errorMessage: 'Date of birth is required'
        },
        isISO8601: {
            errorMessage: 'Date of birth must be a valid date (YYYY-MM-DD)'
        },
        toDate: true
    }
};

const update_patient_schema = {
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
    },

    full_name: {
        exists: {
            errorMessage: 'Full name is required'
        },
        isString: {
            errorMessage: 'Full name must be a String'
        }, 
        trim: true,
        isLength: {
            Ootions: { min: 3, max: 250},
            errorMessage: 'Full name must be between 3 and 250 characters'
        }
    }, 

    email: {
        exists: {
            errorMessage: 'Email is required'
        },
        isEmail: {
            errorMessage: 'Invalid email format'
        }
    },

    address: {
        exists: {
            errorMessage: 'Address is required'
        },
        isString: {
            errorMessage: 'Address must be a String'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 250},
            errorMessage:'Address must be between 3 and 250 characters'
        }
    },

    date_birth: {
        exists: {
            errorMessage: 'Date of birth is required'
        },
        isISO8601: {
            errorMessage: 'Date of birth must be a valid date (YYYY-MM-DD)'
        },
        toDate: true
    }
};

const update_patient_status_schema = {
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
    },

    status: {
        exists: {
            errorMessage: 'Status is required'
        },
        isInt: {
            options: {min: 0, max:1},
            errorMessage: 'Status must be 0 or 1'
        },
        toInt: true
    }
};


const get_patient_schema = {
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
    validate_create_patient: checkSchema(create_patient_schema),
    validate_update_patient: checkSchema(update_patient_schema),
    validate_update_patient_status: checkSchema(update_patient_status_schema),
    validate_get_patient: checkSchema(get_patient_schema)
};