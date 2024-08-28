const multer = require('multer');
const path = require('path');
const fs = require('fs');  // Import fs module
const File = require('../models/File');

// Multer configuration for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpg', '.jpeg', '.gif', '.png'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid image type.'));
    }
  }
}).single('file');

const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      category: 'image'
    });

    file.save()
      .then(() => res.status(200).json({ message: 'Image uploaded successfully.' }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
};

const getImages = (req, res) => {
  const imageDir = path.join(__dirname, '../uploads/images');
  
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory.' });
    }

    const imageFiles = files.map(file => ({
      filename: file,
      path: `/uploads/images/${file}`
    }));

    res.status(200).json(imageFiles);
  });
};

module.exports = { uploadImage, getImages };