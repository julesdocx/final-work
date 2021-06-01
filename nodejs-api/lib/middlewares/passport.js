const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const userService = require('../services/user.service')

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  function (username, password, done) {
    return userService.authenticateUser({ username, password })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect user or password.' });
        }
        return done(null, user, { message: 'Logged In Successfully' });
      })
      .catch(err => done(err));
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
  function (jwtPayload, cb) {
    return userService.getUserById(jwtPayload.id)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));

const checkRoles = (...roles) => (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
  }
  const hasRole = roles.find(role => req.user.roles.includes(role));
  if (!hasRole) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
}

module.exports = { passport, checkRoles };