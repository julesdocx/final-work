const express = require('express');
const { passport, checkRoles } = require('../middlewares/passport');
const userController = require('../controllers/user.controller');
const storyController = require('../controllers/story.controller');

let router = express.Router();

// router.use('/users', passport.authenticate('jwt', { session: false }), userController);

// router.use('/stories', passport.authenticate('jwt', { session: false }), storyController);

router.use('/users', userController);

router.use('/stories', storyController);

module.exports = router;
