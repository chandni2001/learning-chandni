const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// Product routes
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);

// Search routes
router.get('/search/name/:name', productController.findProductByName);
router.get('/search/availability/:availability', productController.findProductByAvailability);
router.get('/search/price/:price', productController.findProductByPriceGreaterThan);

module.exports = router;
