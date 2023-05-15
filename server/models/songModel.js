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
    // duration: {
    //     type: Number,
    //     required: [true, 'A song must have a duration'],
    // },
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

// Query middlewares
songSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'artist',
    select: 'name photo',
  });

  next();
});

const Song = new mongoose.model('Song', songSchema);

module.exports = Song;
