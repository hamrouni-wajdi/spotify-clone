const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Playlist = require('../models/playlistModel');

// Multer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

exports.resizePlaylistImg = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `playlist-${req.params.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(520, 520)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/playlists/${req.file.filename}`);

  next();
});

const upload = multer({ storage, fileFilter });

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
  const playlist = await Playlist.findById(req.params.id)
    .populate('songs')
    .populate('user', 'name photo');

  if (!playlist)
    return next(new AppError('❓ No playlist found with that id', 404));

  const serverUrl = `${req.protocol}://${req.get('host')}/`;
  playlist.songs.map((song) => {
    song.song = `${serverUrl}public/songs/${song.song}`;
    song.img = `${serverUrl}public/songs/${song.img}`;
  });
  playlist.user.photo = `${serverUrl}public/users/${playlist.user.photo}`;

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
  req.body.img = req.file.filename;
  const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
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
