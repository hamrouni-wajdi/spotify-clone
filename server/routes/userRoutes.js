const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const playlistRouter = require('../routes/playlistRoutes');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

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
  userController.updateMe
);
router.delete('/deleteMe', authController.protect, authController.deleteMe);

router.use('/:userId/playlists', playlistRouter);

// Manage likes
router.use('/likes', authController.protect, userController.likeSong);

module.exports = router;
