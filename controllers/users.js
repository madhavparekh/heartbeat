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
          res.send({
            success: false,
            message: 'Authentication failed. User not found.',
            reroute: '/login',
          });
        } else {
          // Check if password matches
          user.comparePassword(req.body.password, (error, isMatch) => {
            if (isMatch && !error) {
              // Create token if the password matched and no error was thrown
              const token = jwt.sign(user.toObject(), config.secret, {
                expiresIn: '1h', // in 1 hour
              });

              res.json({
                success: true,
                token,
                message: 'Logged in successfully',
                name: user.name,
                reroute: '/upload',
              });
            } else {
              res.send({
                success: false,
                message: 'Authentication failed. Passwords did not match!',
                reroute: '/login',
              });
            }
          });
        }
      },
    );
  },

  logout(req, res) {
    // the logout method is added to the request object automatically by Passport
    req.logout();
    return res.json({ success: true, message: 'Logged out', reroute: '/' });
  },

  authUser(req, res) {
    if (!req.body.headers.Authorization) {
      res.json({
        success: false,
        message: 'Missing Authorizationg token',
        reroute: '/login',
      });
    } else {
      const decoded = jwt.verify(req.body.headers.Authorization, config.secret);

      const currentTime = new Date();

      if (decoded.exp < currentTime.getTime()) {
        req.logout();
        res.json({
          success: false,
          message: 'You have been logged out, please log in!',
          reroute: '/login',
        });
      } else {
        User.findOne({ email: decoded.data.email })
          .then((user) => {
            if (user) {
              res.json({
                success: true,
                message: `Welcome back ${decoded.data.name}`,
                reroute: '/upload',
              });
            } else {
              res.json({ success: false, message: 'Please log in!', reroute: '/login' });
            }
          })
          .catch(err => res.json({
            success: false,
            message: 'Oops, something went wrong, try again!',
            reroute: '/login',
          }));
      }
    }
  },

  signin(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
      // is email address already in use?
      if (user) {
        res.json({ success: false, message: 'Email already in use', reroute: '/signin' });
        return;
      }
      // go ahead and create the new user

      User.create(req.body, (error, newUser) => {
        if (error) {
          res.json({
            success: false,
            message: 'Could not create new account! Try Again',
            reroute: '/signin',
          });
        } else {
          // Create token if user is created
          const token = jwt.sign(newUser.toObject(), config.secret, {
            expiresIn: '1h', // in 1 hour
          });
          res.json({
            success: true,
            token,
            message: 'New account created successfully',
            name: newUser.name,
          });
        }
      });
    });
  },
};
