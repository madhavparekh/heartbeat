// const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/main');

// -------------------------------------------

module.exports = {
  login(req, res) {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) throw err;

        if (!user) {
          res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
          // Check if password matches
          user.comparePassword(req.body.password, (error, isMatch) => {
            if (isMatch && !error) {
              // Create token if the password matched and no error was thrown
              const token = jwt.sign(user.toObject(), config.secret, {
                expiresIn: 10080, // in seconds
              });
              res.json({ success: true, token: `JWT ${token}` });
            } else {
              res.send({
                success: false,
                message: 'Authentication failed. Passwords did not match.',
              });
            }
          });
        }
      },
    );
  },

  // -------------------------------------------

  logout(req, res) {
    // the logout method is added to the request object automatically by Passport
    req.logout();
    return res.json({ success: true });
  },

  // -------------------------------------------

  signin(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
      // is email address already in use?
      if (user) {
        res.json({ success: false, message: 'Email already in use' });
        return;
      }
      // go ahead and create the new user

      User.create(req.body, (error) => {
        if (error) {
          // console.log(error);
          res.json({ success: false });
        } else {
          res.json({ success: true });
        }
      });
    });
  },
};
