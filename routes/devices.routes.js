const express = require('express');
const isAuthenticated = require('../config/jwt.validator');
const deviceController = require('../controller/device.controller');

const router = express.Router();
router.use(isAuthenticated);
router.post('/create', deviceController.saveDevice);
router.get('/userdevices', deviceController.getUserDevices);
router.get('/remove', deviceController.removeDevice);
router.post('/change/status', deviceController.deviceStatusChange);

module.exports = router;