const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const { promisify } = require('util');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

const createSendToken = (user, statusCode, req, res) => {
  // Generate token
  const token = signToken(user.id);

  // Generate cookie
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    withCredentials: true,
  };
  res.cookie('jwt', token, cookieOptions);

  user.img = `${req.protocol}://${req.get('host')}/public/users/${user.img}`;
  user.password = undefined;

  // Send response
  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  const user = await User.create(userData);

  await new Email(user).sendWelcome();

  createSendToken(user, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) Check email and password in request
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('🚫 Please provide email and password', 400));
  }

  // 2) Get the user from DB
  const user = await User.findOne({ email })
    .select('+password')
    .populate('playlists')
    .populate('followedArtists', 'name img role')
    .populate('likedPlaylists', 'name img')
    .populate('likedSongs');

  if (!user) {
    return next(new AppError('🤷‍ No user found with email: ' + email, 404));
  }

  const serverUrl = `${req.protocol}://${req.get('host')}/`;

  user.img = `${serverUrl}public/users/${user.img}`;
  user.playlists.map((playlist) => {
    playlist.img = `${serverUrl}public/playlists/${playlist.img}`;
  });
  user.followedArtists.map((artist) => {
    artist.img = `${serverUrl}public/users/${artist.img}`;
  });
  user.likedPlaylists.map((playlist) => {
    playlist.img = `${serverUrl}public/playlists/${playlist.img}`;
  });
  user.likedSongs.map((song) => {
    song.song = `${serverUrl}public/songs/${song.song}`;
    song.img = `${serverUrl}public/songs/${song.img}`;
  });

  // 3) Check passwords are correct
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('🔐 Incorrect email or password', 401));
  }

  // 4) Sign token and send to the user
  createSendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() - 10000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success', message: '✌️ See you soon!' });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Check if the token exists and save it
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('🔐 You are not logged in! Please log in to access', 401)
    );
  }

  // 2) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) If still user exists
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        '🔐 The user belonging to this token does no longer exist.',
        401
      )
    );

  // 4) Check user changed password after the token was issued
  if (user.changedPasswordAfter(decoded.iat, 'protect')) {
    return next(
      new AppError(
        '🔐 Your password has been changed. Please log in again.',
        401
      )
    );
  }

  // 5) Grant access
  req.user = user;

  next();
});

// Is logged in
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    // 1) Verify token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    // 2) If still user exists
    const user = await User.findById(decoded.id)
      .populate('playlists')
      .populate('followedArtists', 'name img role')
      .populate('likedPlaylists', 'name img')
      .populate('likedSongs');
    if (!user)
      return next(
        new AppError(
          '🔐 The user belonging to this token does no longer exist.',
          401
        )
      );

    const serverUrl = `${req.protocol}://${req.get('host')}/`;

    user.img = `${serverUrl}public/users/${user.img}`;
    user.playlists.map((playlist) => {
      playlist.img = `${serverUrl}public/playlists/${playlist.img}`;
    });
    user.followedArtists.map((artist) => {
      artist.img = `${serverUrl}public/users/${artist.img}`;
    });
    user.likedPlaylists.map((playlist) => {
      playlist.img = `${serverUrl}public/playlists/${playlist.img}`;
    });
    user.likedSongs.map((song) => {
      song.song = `${serverUrl}public/songs/${song.song}`;
      song.img = `${serverUrl}public/songs/${song.img}`;
    });

    // 3) Check user changed password after the token was issued
    if (user.changedPasswordAfter(decoded.iat, 'login')) {
      return next(
        new AppError(
          '🔐 Your password has been changed. Please log in again.',
          401
        )
      );
    }

    // 4) Grant access
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } else {
    res.status(401).json({
      status: 'error',
      message: '🍪 Please log in first',
    });
  }
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          '⛔ You do not have permission to perform this action!',
          401
        )
      );
    }

    return next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user from DB using email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError('🤷‍ There is no user with that email', 404));

  // 2) Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send token to user's email
  await new Email(user).sendResetToken(resetToken);

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Hash the token form request
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  // 2) Get the user based using token
  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpires: { $gt: Date.now() },
  })
    .populate('playlists')
    .populate('followedArtists', 'name img role')
    .populate('likedPlaylists', 'name img')
    .populate('likedSongs');

  if (!user) {
    return next(new AppError('🚫 Token is invalid or expired', 400));
  }

  const serverUrl = `${req.protocol}://${req.get('host')}/`;
  user.followedArtists.map((artist) => {
    artist.img = `${serverUrl}public/users/${artist.img}`;
  });
  user.likedPlaylists.map((playlist) => {
    playlist.img = `${serverUrl}public/playlists/${playlist.img}`;
  });
  user.likedSongs.map((song) => {
    song.song = `${serverUrl}public/songs/${song.song}`;
    song.img = `${serverUrl}public/songs/${song.img}`;
  });

  // 3) Update user password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4) Update passwordChangedAt
  // 5) Log user in
  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from DB
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if posted password is correct
  if (!(await user.checkPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('🔐 Your password is incorrect', 401));
  }

  // 3) Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in
  createSendToken(user, 201, req, res);
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // 1) Change active property to false
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
  });
});
