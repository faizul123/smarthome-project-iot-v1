const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const routes = require('./routes');
const config = require('./config');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(xss());

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
  
    const response = {
      code: statusCode,
      message,
      ...(config.env === 'development' && { stack: err.stack }),
    };
    res.set({
        'Content-Type': 'application/json',
    });
    res.status(statusCode).send(response);
  };

app.use('/v1',routes);

app.use(errorHandler);

module.exports = app;


