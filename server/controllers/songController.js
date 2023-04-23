const multer = require('multer');
const fs = require('fs');
const Song = require('../models/songModel');

// Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './songs');
  },
  filename(req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.name.replace(/ /g, '-').toLowerCase()}.${ext}`);
  },
});

const upload = multer({ storage });

exports.uploadSongFile = upload.single('song');

exports.getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();

    const serverUrl = `${req.protocol}://${req.get('host')}/`;
    songs.map((song) => {
      const songFile = song.song;
      song.song = serverUrl + songFile;
    });

    res.status(200).json({
      status: 'success',
      results: songs.length,
      data: {
        songs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        song,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createSong = async (req, res, next) => {
  try {
    // Add filename to request body
    req.body.song = req.file.filename;
    const newSong = await Song.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        song: newSong,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateSong = async (req, res, next) => {
  try {
    // Prevent updating song file
    if (req.body.song) return next(new Error('You can not update a song file'));

    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        song,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    // delete song file from storage
    fs.unlink(`./songs/${song.song}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
