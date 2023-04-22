const multer = require('multer');
const Song = require('../models/songModel');

// Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './songs');
  },
  filename(req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.name.replace(/ /g, '').toLowerCase()}.${ext}`);
  },
});

const upload = multer({ storage });

exports.uploadSongFile = upload.single('song');

exports.createSong = async (req, res, next) => {
  try {
    // Add filename to request body
    req.body.song = req.file.filename;
    const newSong = await Song.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        song: newSong,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
