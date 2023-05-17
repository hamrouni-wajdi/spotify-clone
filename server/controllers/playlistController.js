const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Playlist = require('../models/playlistModel');

// Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/songs');
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

exports.uploadPlaylistImg = upload.single('img');

exports.getAllPlaylists = catchAsync(async (req, res, next) => {
  // 1) Get user's playlists
  let filter = {};
  if (req.params.userId) filter = { user: req.params.userId };
  console.log(req.params, filter);

  // 2) Get playlists from DB
  const playlist = await Playlist.find(filter);

  // 3) Send res
  res.status(200).json({
    status: 'success',
    length: playlist.length,
    data: {
      playlist,
    },
  });
});

exports.getPlaylist = catchAsync(async (req, res, next) => {
  // 1) Get playlsit from DB
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist)
    return next(new AppError('❓ No playlist found with that id', 404));

  // 2) Send res
  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});

exports.createPlaylist = catchAsync(async (req, res, next) => {
  // 1) Create a new Playlist
  req.body.user = req.user.id;
  const playlist = await Playlist.create(req.body);

  // 2) Send res
  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});

exports.updatePlaylist = catchAsync(async (req, res, next) => {
  // 1) Update Playlist
  const body = {
    name: req.body.name,
  };

  // This prevents updating image if there is a img propery but not the file on request
  if (req.file) body.img = req.file.filename;

  const playlist = await Playlist.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!playlist)
    return next(new AppError('❓ No playlist found with that id', 404));

  // 2) Send res
  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});

exports.deletePlaylist = catchAsync(async (req, res, next) => {
  // 1) Update Playlist
  const playlist = await Playlist.findByIdAndDelete(req.params.id);

  if (!playlist)
    return next(new AppError('❓ No playlist found with that id', 404));

  // 2) Send res
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Manage songs in playlist
exports.addSong = catchAsync(async (req, res, next) => {
  // 1) Update playlist
  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { songs: req.body.song } },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});

exports.deleteSong = catchAsync(async (req, res, next) => {
  // 1) Update playlist
  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    { $pull: { songs: req.body.song } },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});
