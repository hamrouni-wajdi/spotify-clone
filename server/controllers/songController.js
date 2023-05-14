const multer = require('multer');
const fs = require('fs');
const Song = require('../models/songModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { log } = require('console');

// Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './songs');
  },
  filename(req, file, cb) {
    const ext = file.mimetype.split('/')[1];

    if (file.fieldname === 'song') {
      cb(null, `song-${req.body.name.replace(/ /g, '-').toLowerCase()}.${ext}`);
    } else if (file.fieldname === 'img') {
      cb(null, `img-${req.body.name.replace(/ /g, '-').toLowerCase()}.${ext}`);
    }
  },
});

const upload = multer({ storage });

exports.uploadSongFiles = upload.fields([
  {
    name: 'song',
    maxCount: 1,
  },
  {
    name: 'img',
    maxCount: 1,
  },
]);

exports.getAllSongs = catchAsync(async (req, res, next) => {
  const songs = await Song.find();

  const serverUrl = `${req.protocol}://${req.get('host')}/`;
  songs.map((song) => {
    song.song = serverUrl + song.song;
    song.img = serverUrl + song.img;
  });

  res.status(200).json({
    status: 'success',
    results: songs.length,
    data: {
      songs,
    },
  });
});

exports.getSong = catchAsync(async (req, res, next) => {
  const song = await Song.findById(req.params.id);

  if (!song) return next(new AppError('No song found with given id', 404));

  res.status(200).json({
    status: 'success',
    data: {
      song,
    },
  });
});

exports.createSong = catchAsync(async (req, res, next) => {
  req.body.song = req.files.song[0].filename;
  req.body.img = req.files.img[0].filename;
  const newSong = await Song.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      song: newSong,
    },
  });
});

exports.updateSong = catchAsync(async (req, res, next) => {
  // Prevent updating song file
  if (req.body.song) return next(new Error('You can not update a song file'));

  const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!song) return next(new AppError('No song found with given id', 404));

  res.status(200).json({
    status: 'success',
    data: {
      song,
    },
  });
});

exports.deleteSong = catchAsync(async (req, res, next) => {
  const song = await Song.findByIdAndDelete(req.params.id);

  if (!song) return next(new AppError('No song found with given id', 404));

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
});
