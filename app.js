const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(xss());

app.use('/v1',routes);

module.exports = app;


