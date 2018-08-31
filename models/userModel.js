//Node Modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Custom Modules
const config = require('../config/database');

//Define User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

const User = module.exports = mongoose.model('User', userSchema);

//Fetch user object from mongo by passing '_id' property
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

//Fetch user object from mongo by passing 'username' property
module.exports.getUserByUsername = function (username, callback) {
  const query = {
    username: username
  };

  User.findOne(query, callback);
}

//Add user object in mongo by hassing the password string using salt function
module.exports.addUser = function (newUser, callback) {

  //Specify rounds to be used
  bcrypt.genSalt(10, (err, salt) => {
    //String to be hashed in this case password
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash; //Assign the hash value
      newUser.save(callback);
    });
  });
}

//Compare password by passing original string password and hash value
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  //Compare function return boolean value
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) {
      throw err;
    }

    //callback for async operation
    callback(null, isMatch);
  });
};