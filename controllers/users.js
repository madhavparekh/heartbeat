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
            reroute: '/users/login',
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
                reroute: '/',
              });
            } else {
              res.send({
                success: false,
                message: 'Authentication failed. Passwords did not match!',
                reroute: '/users/login',
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
        reroute: '/users/login',
      });
    } else {
      const decoded = jwt.verify(req.body.headers.Authorization, config.secret);

      const currentTime = new Date();

      if (decoded.exp < currentTime.getTime()) {
        req.logout();
        res.json({
          success: false,
          message: 'You have been logged out, please log in!',
          reroute: '/users/login',
        });
      } else {
        User.findOne({ email: decoded.data.email })
          .then((user) => {
            if (user) {
              res.json({
                success: true,
                message: `Welcome back ${decoded.data.name}`,
                reroute: '/',
              });
            } else {
              res.json({ success: false, message: 'Please log in!', reroute: '/login' });
            }
          })
          .catch(err => res.json({
            success: false,
            message: 'Oops, something went wrong, try again!',
            reroute: '/users/login',
          }));
      }
    }
  },

  signin(req, res) {
    console.log(req.body);
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
            reroute: '/users/signin',
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
            reroute: '/users/upload',
          });
        }
      });
    });
  },
};
