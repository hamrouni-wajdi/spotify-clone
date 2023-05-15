const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 4,
      trim: true,
      required: [true, 'Please specify playlist name'],
    },
    description: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      default: 'default.jpg',
    },
    owner: {
      type: mongoose.Schema.Object.Id,
      ref: 'User',
      required: [true, 'Please specify owner'],
    },
    songs: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Song',
        },
      ],
      validate: {
        validator: (arr) => arr.length <= 50,
        message: 'You can not add more than 50 songs to your playlist',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Playlist = new mongoose.Model('Playlist', playlistSchema);

module.exports = Playlist;
