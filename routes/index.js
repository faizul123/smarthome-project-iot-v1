const express = require('express');
const healthCheck = require('./HealthCheck');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.use(healthCheck);
router.use('/auth',authRoutes);

module.exports = router;