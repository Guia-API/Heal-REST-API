const rate_limit = require ('express-rate-limit');

const api_rate_limiter = rate_limit ({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: {
        ok: false,
        message: 'Too many requests, please try again later.'
    }, 
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = api_rate_limiter;