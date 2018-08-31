//Node Modules
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Custom Modules
const User = require('../models/userModel');
const config = require('../config/database');

module.exports = function (passport) {
  let opts = {};

  //Extracting authorization token from request header
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');

  //Using secret key for decryption
  opts.secretOrKey = config.secret;

  //Using the JwtStrategy and getting jwt_payload
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    //Fetch the user object by passing '_id' property form jwt_payload
    User.getUserById(jwt_payload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })

  }))
}