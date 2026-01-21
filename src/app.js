const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();

app.disable('x-powered-by');

app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

app.use(cookieParser());

module.exports = app;