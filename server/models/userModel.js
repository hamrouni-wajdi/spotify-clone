const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    likedSongs: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Song',
        },
      ],
      validate: {
        validator: (arr) => arr.length <= 50,
        message: 'You can not like more than 50 songs',
      },
    },
    role: {
      type: String,
      enum: ['user', 'artist', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator(confirm) {
          return confirm === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    passwordChangedAt: { type: Date, select: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Query middlewares
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Document middlewares
userSchema.pre('save', async function (next) {
  // Run if the password is modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Schema methods
userSchema.methods.checkPassword = async function (pass, realPass) {
  return await bcrypt.compare(pass, realPass);
};

userSchema.methods.changedPasswordAfter = function (JWTissuedTime) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );

    return JWTissuedTime < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // 1) Generate token
  const resetToken = crypto.randomBytes(12).toString('hex');

  // 2) Hash token and save it to user schema
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // 3) Return resetToken
  return resetToken;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
