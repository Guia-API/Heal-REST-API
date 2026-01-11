const { checkSchema } = require('express-validator');

const create_employee_schema = {
  full_name: {
    exists: {
      errorMessage: 'Full name is required'
    },
    isString: {
      errorMessage: 'Full name must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 250 },
      errorMessage: 'Full name must be between 3 and 250 characters'
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
  },

  cell_phone: {
    exists: {
      errorMessage: 'Cell phone is required'
    },
    isString: {
      errorMessage: 'Cell phone must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 7, max: 20 },
      errorMessage: 'Cell phone must be between 7 and 20 characters'
    }
  },

  rol: {
    exists: {
      errorMessage: 'Role is required'
    },
    isString: {
      errorMessage: 'Role must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: 'Role must be between 3 and 100 characters'
    }
  },

  email: {
    exists: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Invalid email format'
    },
    normalizeEmail: true
  },

  password: {
    exists: {
      errorMessage: 'Password is required'
    },
    isString: {
      errorMessage: 'Password must be a string'
    },
    isLength: {
      options: { min: 8, max: 255 },
      errorMessage: 'Password must be at least 8 characters long'
    }
  }
};

const update_employee_schema = {
  id_employee: {
    in: ['params'],
    exists: {
      errorMessage: 'Employee id is required'
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Employee id must be a valid positive integer'
    },
    toInt: true
  },

  full_name: create_employee_schema.full_name,
  date_birth: create_employee_schema.date_birth,
  cell_phone: create_employee_schema.cell_phone,
  rol: create_employee_schema.rol,

  email: {
    optional: true,
    ...create_employee_schema.email
  }
};

const update_employee_status_schema = {
  id_employee: {
    in: ['params'],
    exists: {
      errorMessage: 'Employee id is required'
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Employee id must be a valid positive integer'
    },
    toInt: true
  },

  status: {
    exists: {
      errorMessage: 'Status is required'
    },
    isInt: {
      options: { min: 0, max: 1 },
      errorMessage: 'Status must be 0 or 1'
    },
    toInt: true
  }
};

const get_employee_schema = {
  id_employee: {
    in: ['params'],
    exists: {
      errorMessage: 'Employee id is required'
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Employee id must be a valid positive integer'
    },
    toInt: true
  }
};

module.exports = {
  validate_create_employee: checkSchema(create_employee_schema),
  validate_update_employee: checkSchema(update_employee_schema),
  validate_update_employee_status: checkSchema(update_employee_status_schema),
  validate_get_employee: checkSchema(get_employee_schema)
};
