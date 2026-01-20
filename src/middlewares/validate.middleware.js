const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};

    errors.array().forEach(err => {
      if (!formattedErrors[err.path]) {
        formattedErrors[err.path] = [];
      }
      formattedErrors[err.path].push(err.msg);
    });

    return res.status(400).json({
      ok: false,
      errors: formattedErrors
    });
  }

  next();
};
