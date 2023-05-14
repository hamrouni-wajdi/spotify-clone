const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  // Run if the password is modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
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

const User = new mongoose.model('User', userSchema);

module.exports = User;
