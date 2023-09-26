const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A song must have a name'],
      trim: true,
      unique: true,
      minLength: 3,
    },
    artist: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A song must belong to an artist'],
    },
    song: {
      type: String,
      required: [true, 'A song must have a song'],
    },
    img: {
      type: String,
      required: [true, 'A song must have a cover img'],
    },
    // genre: {
    //   type: String,
    //   enaum: [
    //     'pop',
    //     'hip-hop',
    //     'rock',
    //     'electronic',
    //     'latin',
    //     'indie',
    //     'classic',
    //     'k-pop',
    //     'country',
    //     'metal',
    //   ],
    //   required: [true, 'Please select song genre'],
    // },
    plays: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Song = new mongoose.model('Song', songSchema);

module.exports = Song;
