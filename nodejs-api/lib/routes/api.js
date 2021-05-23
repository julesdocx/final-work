const express = require('express');
const { passport, checkRoles } = require('../middlewares/passport');
const userController = require('../controllers/user.controller');

let router = express.Router();

router.use('/users', passport.authenticate('jwt', { session: false }), userController);

module.exports = router;
