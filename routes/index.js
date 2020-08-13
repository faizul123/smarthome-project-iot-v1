const express = require('express');
const healthCheck = require('./HealthCheck');
const authRoutes = require('./auth.routes');
const deviceRoutes = require('./devices.routes');

const router = express.Router();

router.use(healthCheck);
router.use('/auth', authRoutes);
router.use('/device', deviceRoutes);

module.exports = router;