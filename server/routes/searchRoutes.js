const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

router.get('/song', songController.searchSong);

module.exports = router;
