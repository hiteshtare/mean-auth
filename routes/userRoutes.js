const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./../models/userModel');
const config = require('./../config/database');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', (req, res, next) => {

  //Create user model
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  })

  //Add a user to mongo
  User.addUser(newUser, function (err, callback) {
    //Error while adding    
    if (err) {
      res.json({
        success: false,
        message: 'Unable to register User!'
      })
    } else {
      res.json({
        success: true,
        message: 'User registered successfully.'
      })
    }
  })

});

//Authentication - gives back the token
router.post('/authenticate', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  //Get user object from mongo by passing username
  User.getUserByUsername(username, (err, user) => {
    //Error while adding
    if (err) {
      res.json({
        success: false,
        message: 'Unable to verify User!'
      });
    }
    //User object is null (does not exist)
    if (!user) {
      res.json({
        success: false,
        message: 'User not found!'
      });
    }

    //User object is exist in mongo then proceed ahead with password comparision
    User.comparePassword(password, user.password, (err, isMatch) => {
      //Error while adding
      if (err) {
        throw err;
      }

      //If entered password matches with has value
      if (isMatch) {

        //Generate token with expiration and signed secret key
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 //1 week
        });

        //Send json response including token for front end storage
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else { //If entered password does matches
        res.json({
          success: false,
          message: 'Wrong Password!'
        })
      }

    });
  });

});

//Profile - Route protected with jwt token for access
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    user: req.user
  });
});

// router.get('/validate', (req, res, next) => {
//   res.send('VALIDATE');
// });

module.exports = router;