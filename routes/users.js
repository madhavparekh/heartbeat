const express = require('express');
const { users } = require('../controllers');

const router = express.Router();

/* Users routes */
router.post('/login', users.login);
router.get('/logout', users.logout);
router.post('/signin', users.signin);
router.get('/authuser', users.authUser);

module.exports = router;
