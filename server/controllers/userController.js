const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/users');
  },
  filename(req, file, cb) {
    const ext = file.mimetype.split('/')[1];

    cb(null, `artist-${req.body.name.replace(/ /g, '-').toLowerCase()}.${ext}`);
  },
});

const upload = multer({ storage });

exports.uploadPhoto = upload.single('photo');

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Check if user posted their password
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('🚫 This route is not for password updates.', 400)
    );

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
