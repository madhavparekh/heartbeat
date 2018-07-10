/* eslint-disable */
const express = require('express');
const jwt = require('jsonwebtoken');
// const cloudinary = require('cloudinary');
const passport = require('passport');
const multer = require('multer');
const config = require('../config/main');
const { uploadUserData } = require('../utils/uploadDatabase');

const { users } = require('../controllers');

const router = express.Router();

// cloudinary config
// cloudinary.config({
// 	cloud_name: process.env.CLOUD_NAME,
// 	api_key: process.env.CLOUD_API_KEY,
// 	api_secret: process.env.CLOUD_API_SECRET,
// });

/* Users routes */
router.post('/login', users.login);
router.get('/logout', users.logout);
router.post('/signin', users.signin);
router.get('/authuser', users.authUser);

//instantiate multer storage to define the tmp folder path to store file
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, `./static/csv/`);
// 	},
// 	// register the file with his original name and extension
// 	filename: (req, file, cb) => {
// 		cb(null, file.originalname);
// 	},
// });
var storage = multer.memoryStorage();
//declare the upload method with storage path and filename registration
const upload = multer({ storage: storage });
//const upload = multer();

router.post(
	'/upload',
	upload.single('file'),
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		if (!req.file) return res.status(400).send('No files were uploaded.');
		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		// const sampleFile = req.files.file;
		//console.log(req.file);
		//console.log(req.file.buffer.toString('utf8'));

		//console.log(req.body);

		// cloudinary.uploader.upload(sampleFile, (response) => {
		//   console.log(response);
		// });
		// Use the mv() method to place the file somewhere on your server
		// sampleFile.mv(`${__dirname}/../static/csv/${sampleFile.name}`, err => {
		// 	if (err) return res.status(500).send(err);

		const decoded = jwt.verify(req.headers.authorization.split(' ')[1], config.secret);

		uploadUserData(decoded.email, req.file.buffer.toString('utf8'));

		// 	res.send('File uploaded!');
		// });
		res.send('File uploaded!');
	},
);

module.exports = router;
