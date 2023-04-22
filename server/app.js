const express = require('express');

const songRouter = require('./routes/songRoutes');

const app = express();

app.use(express.json());

// Routes
app.use('/api/v1/songs', songRouter);

module.exports = app;
