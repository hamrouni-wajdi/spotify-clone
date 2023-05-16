const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Playlist = require('../models/playlistModel');

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
