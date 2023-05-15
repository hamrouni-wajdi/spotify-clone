const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Playlist = require('../models/playlistModel');

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
  req.body.owner = req.user.id;
  const playlist = await Playlist.create(req.body);

  // 2) Send res
  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});
