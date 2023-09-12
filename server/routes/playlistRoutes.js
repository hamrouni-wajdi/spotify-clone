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
    playlistController.resizePlaylistImg,
    playlistController.updatePlaylist
  )
  .delete(playlistController.deletePlaylist);

// Manage songs in playlist
router
  .route('/:id/song')
  .post(playlistController.addSong)
  .delete(playlistController.deleteSong);

router
  .route('/likes/add')
  .post(authController.protect, playlistController.likePlaylist);

router
  .route('/likes/remove')
  .post(authController.protect, playlistController.dislikePlaylist);

module.exports = router;
