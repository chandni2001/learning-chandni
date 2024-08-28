const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the fs module
const File = require('../models/File');

// Multer configuration for videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.mp4', '.wmv'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid video type.'));
    }
  }
}).single('file');

const uploadVideo = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      category: 'video'
    });

    file.save()
      .then(() => res.status(200).json({ message: 'Video uploaded successfully.' }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
};

const getVideos = (req, res) => {
  const videoDir = path.join(__dirname, '../uploads/videos');
  
  fs.readdir(videoDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory.' });
    }

    const videoFiles = files.map(file => ({
      filename: file,
      path: `/uploads/videos/${file}`
    }));

    res.status(200).json(videoFiles);
  });
};

module.exports = { uploadVideo, getVideos };