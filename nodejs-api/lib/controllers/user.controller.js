const express = require('express');
const { checkRoles } = require('../middlewares/passport');
const userService = require('../services/user.service');
let router = express.Router();

router.get('', checkRoles('admin'), (req, res) => {
  userService.getAll(req, res);
});

router.post('/register', checkRoles('admin'), (req, res) => {
  userService.postUser(req, res);
});

router.delete('/delete/:id', checkRoles('admin'), (req, res) => {
  userService.deleteUser(req, res);
});

router.post('/update', checkRoles('admin'), (req, res) => {
  console.log(req.body.user);
  userService.updateUser(req, res);
});

module.exports = router;