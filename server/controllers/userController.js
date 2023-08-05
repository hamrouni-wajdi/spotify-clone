const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Multer
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, './public/users');
//   },
//   filename(req, file, cb) {
//     const ext = file.mimetype.split('/')[1];

//     cb(null, `artist-${req.body.name.replace(/ /g, '-').toLowerCase()}.${ext}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

const upload = multer({ storage, fileFilter });

exports.uploadPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(520, 520)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/users/${req.file.filename}`);

  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Check if user posted their password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('🚫 This route is not for password updates.', 400)
    );
  }

  // 2) Update user data
  const userData = {
    name: req.body.name,
    email: req.body.email,
    photo: req.file.filename,
  };

  const user = await User.findByIdAndUpdate(req.user.id, userData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getArtist = catchAsync(async (req, res, next) => {
  const artist = await User.findById(req.params.id).populate('songs');

  if (!artist || artist.role !== 'artist') {
    return next(new AppError('No artist found with that ID', 404));
  }

  const serverUrl = `${req.protocol}://${req.get('host')}/`;
  artist.songs.map((song) => {
    song.song = `${serverUrl}public/songs/${song.song}`;
    song.img = `${serverUrl}public/songs/${song.img}`;
  });

  res.status(200).json({
    status: 'success',
    data: artist,
  });
});

exports.followArtist = catchAsync(async (req, res, next) => {
  const artist = await User.findById(req.params.id);

  if (!artist || artist.role !== 'artist') {
    return next(new AppError('You can only follow artists', 404));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { followedUsers: req.params.id } },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    data: user.followedUsers,
  });
});

// Likes
exports.getLikedSongs = catchAsync(async (req, res, next) => {
  // REVIEW: If logged in used is artist user info is populated twice
  const user = await User.findById(req.user.id).populate('likedSongs');

  res.status(200).json({
    status: 'success',
    data: {
      songs: user.likedSongs,
    },
  });
});

exports.likeSong = catchAsync(async (req, res, next) => {
  const { song } = req.body;

  // REVIEW: If logged in used is artist user info is populated twice
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { likedSongs: song } },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    songs: user.likedSongs,
  });
});

exports.dislikeSong = catchAsync(async (req, res, next) => {
  const { song } = req.body;
  console.log(req.body);

  // REVIEW: If logged in used is artist user info is populated twice
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { likedSongs: song } },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    songs: user.likedSongs,
  });
});
