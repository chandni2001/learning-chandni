const multer = require('multer');
const path = require('path');
const File = require('../models/File');

// Multer configuration for documents
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.doc', '.docx', '.pdf'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid document type.'));
    }
  }
}).single('file');

const uploadDocument = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      category: 'document'
    });

    file.save()
      .then(() => res.status(200).json({ message: 'Document uploaded successfully.' }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
};

const getDocuments = (req, res) => {
  File.find({ category: 'document' })
    .then(files => res.status(200).json(files))
    .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = { uploadDocument, getDocuments };
