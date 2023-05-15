const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Playlist = require('../models/playlistModel');

exports.createPlaylist = catchAsync(async (req, res, next) => {
  // 1) Create a new Playlist
  req.body.owner = req.user.id;
  console.log(req.body);
  const playlist = await Playlist.create(req.body);

  // 2) Send res
  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});
