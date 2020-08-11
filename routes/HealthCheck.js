const express = require('express');
const healthCheckController = require('../controller/HealthCheck');
const router = express.Router();

router.get('/health', healthCheckController.healthCheck);

module.exports = router;