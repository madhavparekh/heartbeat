const express = require('express');
const passport = require('passport');

const { users } = require('../controllers');

const router = express.Router();

/* Users routes */
router.post('/login', users.login);
router.get('/logout', users.logout);
router.post('/signin', users.signin);
router.get('/authuser', users.authUser);

router.post('/upload', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const sampleFile = req.files.files;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`${__dirname}/../static/csv/userFile.csv`, (err) => {
    if (err) return res.status(500).send(err);

    return res.send('File uploaded!');
  });
});

module.exports = router;
