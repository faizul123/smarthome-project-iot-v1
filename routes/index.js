const express = require('express');
const healthCheck = require('./HealthCheck');

const router = express.Router();

router.use(healthCheck);

module.exports = router;