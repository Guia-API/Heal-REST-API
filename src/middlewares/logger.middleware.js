const fs = require('fs');
const path = require('path');
const requestIp = require('request-ip');

const logDir = path.join(__dirname, '../logs');
const accessLogPath = path.join(logDir, 'access.log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = (req, res, next) => {
    const start = Date.now();
    const ip = requestIp.getClientIp(req);

    res.on('finish', () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        const method = req.method;
        const url = req.originalUrl;
        const status = res.statusCode;

        let email = 'Anónimo';
        if (req.user?.email) {
            email = req.user.email;
        }

        const logMessage =
            `[${timestamp}] ${method} ${url} ${status} - ${ip} - ${email} - ${duration}ms\n`;

        fs.appendFile(accessLogPath, logMessage, (err) => {
            if (err) {
                next(err);
            }
        });
    });

    next();
};

module.exports = logger;
