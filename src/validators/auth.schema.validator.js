const { checkSchema } = require('express-validator');

/**
 * LOGIN
 * Body: { email, password }
 */
const login_schema = {
  email: {
    exists: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Email must be a valid email address'
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
      options: { min: 8, max: 128 },
      errorMessage: 'Password must be between 8 and 128 characters'
    }
  }
};


module.exports = {
  validate_login: checkSchema(login_schema)
};
