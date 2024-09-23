const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/images/', // Directory to save images
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Max 1MB file size
  fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
  }
}).fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]);


module.exports = upload;
