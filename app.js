var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var { uploadDailyDataDatabase } = require('./utils/uploadDatabase');

var app = express();

// Connect to the Mongo DB
var databaseUri = 'mongodb://localhost/heartbeat';
var mongooseOptions = { poolSize: 20 };

if (process.env.MONGODB_URI) {
	mongoose.connect(
		process.env.MONGODB_URI,
		mongooseOptions
	);
} else {
	mongoose.connect(
		databaseUri,
		mongooseOptions
	);
}

var db = mongoose.connection;

//show any mongoose error
db.on('error', (err) => {
	console.log('Mongoose Error: ', err);
});

db.once('open', () => {
	console.log('Mongoose connectoion successful');
});

uploadDailyDataDatabase();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
