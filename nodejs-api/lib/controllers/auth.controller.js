const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('we zitten hier id error van /login', err)
      return res.status(400).json({
        message: info.message || 'Something went wrong',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const roles =  user.roles.map(x=>x.name.toLowerCase())
      const jwtPayload = { sub: user.id, email: user.email, admin: roles.includes('admin'), roles: roles }
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);
      return res.json({ token });
    });
  })(req, res);
});

module.exports = router;
