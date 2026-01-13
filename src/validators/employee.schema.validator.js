const { checkSchema } = require('express-validator');

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/;

const passwordValidator = {
  isString: {
    errorMessage: 'Password must be a string'
  },
  isLength: {
    options: { min: 8, max: 15 },
    errorMessage: 'Password must be between 8 and 15 characters'
  },
  custom: {
    options: (value) => {
      if (!PASSWORD_REGEX.test(value)) {
        throw new Error(
          'Password must contain at least one letter, one number and one symbol'
        );
      }
      return true;
    }
  }
};

const base_employee_fields = {
  full_name: {
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
    isISO8601: {
      errorMessage: 'Date of birth must be a valid date (YYYY-MM-DD)'
    },
    toDate: true
  },
  cell_phone: {
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
    isString: {
      errorMessage: 'Role must be a string'
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: 'Role must be between 3 and 100 characters'
    }
  }
};

const create_employee_schema = {
  full_name: {
    exists: { errorMessage: 'Full name is required' },
    ...base_employee_fields.full_name
  },
  date_birth: {
    exists: { errorMessage: 'Date of birth is required' },
    ...base_employee_fields.date_birth
  },
  cell_phone: {
    exists: { errorMessage: 'Cell phone is required' },
    ...base_employee_fields.cell_phone
  },
  rol: {
    exists: { errorMessage: 'Role is required' },
    ...base_employee_fields.rol
  },
  email: {
    exists: { errorMessage: 'Email is required' },
    isEmail: { errorMessage: 'Invalid email format' },
    normalizeEmail: true
  },
  password: {
    exists: { errorMessage: 'Password is required' },
    ...passwordValidator
  }
};

const update_employee_schema = {
  id_employee: {
    in: ['params'],
    exists: { errorMessage: 'Employee id is required' },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Employee id must be a valid positive integer'
    },
    toInt: true
  },
  full_name: {
    optional: true,
    ...base_employee_fields.full_name
  },
  date_birth: {
    optional: true,
    ...base_employee_fields.date_birth
  },
  cell_phone: {
    optional: true,
    ...base_employee_fields.cell_phone
  },
  rol: {
    optional: true,
    ...base_employee_fields.rol
  },
  email: {
    optional: true,
    isEmail: { errorMessage: 'Invalid email format' },
    normalizeEmail: true
  },
  password: {
    optional: true,
    ...passwordValidator
  }
};

const update_employee_status_schema = {
  id_employee: {
    in: ['params'],
    exists: { errorMessage: 'Employee id is required' },
    isInt: {
      options: { min: 1 },
      errorMessage: 'Employee id must be a valid positive integer'
    },
    toInt: true
  },
  status: {
    exists: { errorMessage: 'Status is required' },
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
    exists: { errorMessage: 'Employee id is required' },
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