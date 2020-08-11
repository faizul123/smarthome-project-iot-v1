const httpStatus = require('http-status');

const healthCheck = async (req, res) => {
    res.status(httpStatus.OK).send({health: 'OK'});
}

module.exports = {
    healthCheck,
}