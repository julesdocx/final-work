const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userService = require('../services/user.service');

router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, userObj, info) => {
    if (err || !userObj) {
      console.log('we zitten hier id error van /login', err)
      return res.status(400).json({
        message: info.message || 'Something went wrong',
        userObj: userObj
      });
    }
    req.login(userObj, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const jwtPayload = { id: userObj.id, email: userObj.user.email }
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);
      return res.json({ token });
    });
  })(req, res);
});

router.post('/register', (req, res) => {
  userService.postUser(req, res);
});

module.exports = router;
