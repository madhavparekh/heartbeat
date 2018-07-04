// Defining a User Model in mongoose
// Code modified from https://github.com/sahat/hackathon-starter

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
  },
});

/**
 * Password hash middleware.
 */
UserSchema.pre('save', (next) => {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    return bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      return bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        return next();
      });
    });
  }
  return next();
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = (pw, cb) => (
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  })
);

/**
 * Statics
 */

module.exports = mongoose.model('User', UserSchema);
