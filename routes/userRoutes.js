const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./../models/userModel');

//Register
router.post('/register', (req, res, next) => {
  //res.send('REGISTER');

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  })

  User.addUser(newUser, function (err, callback) {
    if (err) {
      res.json({
        'success': false,
        'message': 'Unable to register User!'
      })
    } else {
      res.json({
        'success': true,
        'message': 'User registered successfully.'
      })
    }
  })

});

//Authentication
router.post('/authentication', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) {
      res.json({
        'success': true,
        'message': 'Unable to verify User!'
      });
    }
    if (!user) {
      res.json({
        'success': true,
        'message': 'User not found!'
      });
    }

    User.comparePassword(password, user.passpord, (err, isMatch) => {

    });
  });

});

//Profile
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
});

// router.get('/validate', (req, res, next) => {
//   res.send('VALIDATE');
// });

module.exports = router;