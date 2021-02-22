const createError = require('http-errors');
const express = require('express');

const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const errorHandler = require('./Middleware/ErrorHandler');
const Routes = require('./Routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  exposedHeaders: ['X-Total-Count'],
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', Routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
