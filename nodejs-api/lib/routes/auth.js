const express = require('express');

const authController = require('../controllers/auth.controller');

let router = express.Router();

router.use('/', authController);

module.exports = router;