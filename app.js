const CronJob = require('cron').CronJob; //eslint-disable-line
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose/lib');
const passport = require('passport');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const {
  uploadImpairedDatabase,
  uploadUnimpairedDatabase,
  uploadAggregateData,
} = require('./utils/uploadDatabase');

const app = express();

app.use(cors());

// Connect to the Mongo DB
const databaseUri = 'mongodb://localhost/heartbeat';

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}

const db = mongoose.connection;

// show any mongoose error
db.on('error', (err) => {
	console.log('Mongoose Error: ', err); //eslint-disable-line
});

db.once('open', () => {
	console.log('Mongoose connectoion successful'); //eslint-disable-line
});

// upload data if argv set to '--upload'
if (process.argv[2] === '--upload') {
  switch (process.argv[3]) {
    case 'impaired':
      uploadImpairedDatabase();
      break;
    case 'unimpaired':
      uploadUnimpairedDatabase();
      break;
    case 'aggregate':
      uploadAggregateData();
      break;
    default:
      // impaired data
			console.log('Loading Impaired data..'); //eslint-disable-line
      uploadImpairedDatabase();
      // unimpaired data
      setTimeout(() => {
				console.log('Loading Unimpaired data..'); //eslint-disable-line
        uploadUnimpairedDatabase();
      }, 1000 * 60 * 5);
      // aggregate data
      setTimeout(() => {
				console.log('Loading Aggregate data..'); //eslint-disable-line
        uploadAggregateData();
      }, 1000 * 60 * 10);
  }
}
// scheduling task for uploading flow data
CronJob(
  '00 00 00 * * 6',
  () => {
		console.log('Uploading Impaired Data..'); //eslint-disable-line
    // upload impaired data from website (USGS/IBWC)
    uploadImpairedDatabase();
  },
  () => {
		console.log('Impaired Data uploaded..'); //eslint-disable-line
  },
  true /* Start the job right now */,
  'America/Los_Angeles' /* Time zone of this job. */,
);

CronJob(
  '00 15 00 * * 6',
  () => {
		console.log('Uploading Unmpaired Data..'); //eslint-disable-line

    // upload unimpaired data from CSV file
    uploadUnimpairedDatabase();
  },
  () => {
		console.log('Unmpaired Data uploaded..'); //eslint-disable-line
  },
  true /* Start the job right now */,
  'America/Los_Angeles' /* Time zone of this job. */,
);
CronJob(
  '00 30 00 * * 6',
  () => {
		console.log('Uploading Aggregate Impaired/Unmpaired Data..'); //eslint-disable-line
    // upload aggregate data
    uploadAggregateData();
  },
  () => {
		console.log('Aggregate Impaired/Unmpaired Data uploaded..'); //eslint-disable-line
  },
  true /* Start the job right now */,
  'America/Los_Angeles' /* Time zone of this job. */,
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve static files from the React app

app.use(passport.initialize());
// Bring in defined Passport Strategy
require('./config/passport')(passport);

app.use(passport.session());

app.use(fileUpload());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
