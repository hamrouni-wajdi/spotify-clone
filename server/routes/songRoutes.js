const express = require('express');
const songController = require('../controllers/songController');
const authController = require('../controllers/authController');

const router = express.Router();

// router
//   .route('/liked')
//   .get(authController.protect, songController.getLikedSongs);

router
  .route('/')
  .get(authController.protect, songController.getAllSongs)
  .post(
    authController.protect,
    authController.restrictTo('artist'),
    songController.uploadSongFiles,
    songController.resizeSongImg,
    songController.saveSongFile,
    songController.createSong
  );

router
  .route('/:id')
  .get(authController.protect, songController.getSong)
  .patch(
    authController.protect,
    authController.restrictTo('artist'),
    songController.uploadSongFiles,
    songController.resizeSongImg,
    songController.updateSong
  )
  .delete(
    authController.protect,
    authController.restrictTo('artist', 'admin'),
    songController.deleteSong
  );

module.exports = router;
