const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const playlistRouter = require('./playlistRoutes');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/isLoggedIn', authController.isLoggedIn);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:resetToken', authController.resetPassword);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', authController.protect, authController.deleteMe);

// User
router.get('/:id', authController.protect, userController.getArtist);
router.post('/follow/:id', authController.protect, userController.followArtist);
router.post(
  '/unfollow/:id',
  authController.protect,
  userController.unfollowArtist
);

// Playlists
router.use('/:userId/playlists', playlistRouter);

// Manage likes
// router
//   .route('/likes')
//   .get(authController.protect, userController.getLikedSongs)
//   .post(authController.protect, userController.likeSong)
//   .delete(authController.protect, userController.unlikeSong);

router
  .route('/likes/add')
  .post(authController.protect, userController.likeSong);

router
  .route('/likes/remove')
  .post(authController.protect, userController.dislikeSong);

module.exports = router;
