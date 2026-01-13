const express = require ('express')
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.disable("x-powered-by")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

module.exports = app;