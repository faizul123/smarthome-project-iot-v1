const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

let appServer;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    appServer = app.listen(config.port, () => {
        console.log(`app server started and listening on ${config.port}`);
    })
});

const exitHandler = () => {
    if (appServer) {
        appServer.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.log(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (appServer) {
        appServer.close();
    }
});