const { checkSchema } = require('express-validator');

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
      options: { min: 8, max: 15 },
      errorMessage: 'Password must be between 8 and 15 characters'
    }
  }
};


module.exports = {
  validate_login: checkSchema(login_schema)
};
