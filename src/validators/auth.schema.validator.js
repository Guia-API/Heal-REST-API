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

/**
 * REFRESH TOKEN
 * Body: { refresh_token }
 */
const refresh_schema = {
  refresh_token: {
    exists: {
      errorMessage: 'Refresh token is required'
    },
    isString: {
      errorMessage: 'Refresh token must be a string'
    },
    trim: true
  }
};

/**
 * LOGOUT
 * Body: { refresh_token }
 */
const logout_schema = {
  refresh_token: {
    exists: {
      errorMessage: 'Refresh token is required'
    },
    isString: {
      errorMessage: 'Refresh token must be a string'
    },
    trim: true
  }
};

module.exports = {
  validate_login: checkSchema(login_schema),
  validate_refresh: checkSchema(refresh_schema),
  validate_logout: checkSchema(logout_schema)
};
