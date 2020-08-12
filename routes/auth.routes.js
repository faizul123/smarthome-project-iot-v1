const express = require('express');
const isAuthenticated = require('../config/jwt.validator');
const authController = require('../controller/auth.controller');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', isAuthenticated, authController.profile);

module.exports = router;