const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

router
  .route('/')
  .post(songController.uploadSongFile, songController.createSong);

module.exports = router;
