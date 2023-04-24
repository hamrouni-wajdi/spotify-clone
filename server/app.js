const express = require('express');

const globalErrorHandler = require('./controllers/errorController');
const songRouter = require('./routes/songRoutes');

const app = express();

app.use(express.json());

// Static folder
app.use(express.static('songs'));

// Routes
app.use('/api/v1/songs', songRouter);

// Unhandled routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
  next();
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
