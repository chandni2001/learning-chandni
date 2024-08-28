const express = require('express');
const router = express.Router();
const { uploadDocument, getDocuments } = require('../controllers/documentController');

// Upload document
router.post('/', uploadDocument);

// Get documents
router.get('/', getDocuments);

module.exports = router;