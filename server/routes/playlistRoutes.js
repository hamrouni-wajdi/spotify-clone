const express = require('express');
const playlistController = require('../controllers/playlistController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(playlistController.getAllPlaylists)
  .post(authController.protect, playlistController.createPlaylist);

router
  .route('/:id')
  .get(authController.protect, playlistController.getPlaylist)
  .patch(
    playlistController.uploadPlaylistImg,
    playlistController.updatePlaylist
  )
  .delete(playlistController.deletePlaylist);

// Manage songs in playlist
router
  .route('/:id/song')
  .post(playlistController.addSong)
  .delete(playlistController.deleteSong);

module.exports = router;
