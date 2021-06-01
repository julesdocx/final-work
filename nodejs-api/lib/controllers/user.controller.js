const express = require('express');
const { checkRoles } = require('../middlewares/passport');
const userService = require('../services/user.service');
let router = express.Router();

// router.get('', checkRoles('admin'), (req, res) => {
//   userService.getAll(req, res);
// });

router.get('/user/:id', (req, res) => {
  userService.getUserById(req.params.id).then((user) => {
    console.log('/getUser', user)
    if (user != null) {
      res.status(200).send(user);
    } else {
      res.send('user does not exist');
    }
  });
});

// router.delete('/delete/:id', (req, res) => {
//   userService.deleteUser(req, res);
// });

// router.post('/update', (req, res) => {
//   console.log(req.body.user);
//   userService.updateUser(req, res);
// });

module.exports = router;