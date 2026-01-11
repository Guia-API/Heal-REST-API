const { checkSchema } = require('express-validator');

const create_medical_examination_schema = {
  id_medical_history: {
    exists: {
      errorMessage: 'Medical history id is required'
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Medical history id must be a valid positive integer'
    },
    toInt: true
  },

  prescription: {
    exists: {
      errorMessage: 'Prescription is required'
    },
    isString: {
      errorMessage: 'Prescription must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 500 },
      errorMessage: 'Prescription must be between 3 and 500 characters'
    }
  },

  medical_diagnosis: {
    exists: {
      errorMessage: 'Medical diagnosis is required'
    },
    isString: {
      errorMessage: 'Medical diagnosis must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 500 },
      errorMessage: 'Medical diagnosis must be between 3 and 500 characters'
    }
  },

  symptoms: {
    exists: {
      errorMessage: 'Symptoms are required'
    },
    isString: {
      errorMessage: 'Symptoms must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 500 },
      errorMessage: 'Symptoms must be between 3 and 500 characters'
    }
  },

  date: {
    exists: {
      errorMessage: 'Date is required'
    },
    isISO8601: {
      errorMessage: 'Date must be a valid datetime (YYYY-MM-DD HH:mm:ss)'
    },
    toDate: true
  },

  reason: {
    exists: {
      errorMessage: 'Reason is required'
    },
    isString: {
      errorMessage: 'Reason must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 500 },
      errorMessage: 'Reason must be between 3 and 500 characters'
    }
  },

  comments: {
    exists: {
      errorMessage: 'Comments are required'
    },
    isString: {
      errorMessage: 'Comments must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 500 },
      errorMessage: 'Comments must be between 3 and 500 characters'
    }
  },

  type: {
    exists: {
      errorMessage: 'Type is required'
    },
    isString: {
      errorMessage: 'Type must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: 'Type must be between 3 and 100 characters'
    }
  }
};

const update_medical_examination_schema = {
  id_medical_examination: {
    in: ['params'],
    exists: {
      errorMessage: 'Medical examination id is required'
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Medical examination id must be a valid positive integer'
    },
    toInt: true
  },

  prescription: create_medical_examination_schema.prescription,
  medical_diagnosis: create_medical_examination_schema.medical_diagnosis,
  symptoms: create_medical_examination_schema.symptoms,
  date: create_medical_examination_schema.date,
  reason: create_medical_examination_schema.reason,
  comments: create_medical_examination_schema.comments,
  type: create_medical_examination_schema.type
};

const get_medical_examination_schema = {
  id_medical_examination: {
    in: ['params'],
    exists: {
      errorMessage: 'Medical examination id is required'
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Medical examination id must be a valid positive integer'
    },
    toInt: true
  }
};

const get_medical_examinations_by_history_schema = {
  id_medical_history: {
    in: ['params'],
    exists: {
      errorMessage: 'Medical history id is required'
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Medical history id must be a valid positive integer'
    },
    toInt: true
  }
};

module.exports = {
  validate_create_medical_examination: checkSchema(create_medical_examination_schema),
  validate_update_medical_examination: checkSchema(update_medical_examination_schema),
  validate_get_medical_examination: checkSchema(get_medical_examination_schema),
  validate_get_medical_examinations_by_history: checkSchema(
    get_medical_examinations_by_history_schema
  )
};
