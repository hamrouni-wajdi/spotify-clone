const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const crypto = require('crypto');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

const generateCookie = (res, token) => {
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    // secure: true,
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

  const token = signToken(user.id);
  generateCookie(res, token);
  res.status(200).json({
    status: 'success',
    token,
    data: { user },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) Check email and password in request
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Get the user from DB
  const user = await User.findOne({ email }).select('+password');

  // 3) Check passwords are correct
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 4) Sign token and send to the user
  const token = signToken(user.id);
  generateCookie(res, token);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Check if the token exists and save it
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  )
    token = req.headers.authorization.split(' ')[1];

  if (!token)
    return next(
      new AppError('🔐 You are not logged in! Please log in to access', 401)
    );

  // 2) Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) If still user exists
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError());

  // 4) Check user changed password after the token was issued
  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new AppError('🔐 Your password has been changed. Please log in again.')
    );

  // 5) Grant access
  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    console.log(req.user.role);
    if (!roles.includes(req.user.role))
      return next(
        new AppError('⛔ You do not have permission to perform this action!')
      );

    return next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user from DB using email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError('🤷‍♂️ There is no user with that email', 404));

  // 2) Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  console.log('for', resetToken);

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
  });

  if (!user) {
    return next(new AppError('🚫 Token is invalid or expired', 400));
  }

  // 3) Update user password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4) Update passwordChangedAt
  // 5) Log user in
  const token = signToken(user._id);
  generateCookie(res, token);
  res.status(200).json({
    status: 'success',
    token,
  });
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
  const token = signToken();
  generateCookie(res, token);
  res.status(200).json({
    status: 'success',
    token,
  });
});

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
    photo: req.body.photo,
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

exports.deleteMe = catchAsync(async (req, res, next) => {
  // 1) Change active property to false
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
