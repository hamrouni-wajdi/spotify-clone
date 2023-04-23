const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

router
  .route('/')
  .get(songController.getAllSongs)
  .post(songController.uploadSongFile, songController.createSong);

module.exports = router;
