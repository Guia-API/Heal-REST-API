const fs = require('fs');
const path = require('path');
const requestIp = require('request-ip');
const dotenv = require('dotenv');

dotenv.config();

const logDir = path.join(__dirname, '../logs');
const errorLogPath = path.join(logDir, 'error.log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const ip = requestIp.getClientIp(req);
    const timestamp = new Date().toISOString();

    let email = 'Anónimo';
    if (req.user.email) {
        email = req.user.email;
    }

    const logMessage =
        `[${timestamp}] ${statusCode} - ${ip} - ${email} - ${err.message || 'Unknown error'}\n`;

    fs.appendFile(errorLogPath, logMessage, (fsErr) => {
        if (fsErr) {
            console.error('❌ Error writing error log:', fsErr);
        }
    });

    if (process.env.NODE_ENV === 'development') {
        return res.status(statusCode).json({
            status: statusCode,
            message: err.message,
            stack: err.stack
        });
    }

    return res.status(statusCode).json({
        message: 'There was an error processing your request. Please try again later.'
    });
};

module.exports = errorHandler;