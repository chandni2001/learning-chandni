const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategoriesWithServices,
    getCategoryById,
    updateCategory,
    patchCategory,
    deleteCategory,
    createService,
    getServices,
    getServiceById,
    updateService,
    patchService,
    deleteService
} = require('../controllers/categoryController');

// Category Routes
router.post('/categories', createCategory);
router.get('/categories', getCategoriesWithServices);
router.get('/categories/:categoryId', getCategoryById);
router.put('/categories/:categoryId', updateCategory);
// router.patch('/categories/:categoryId', patchCategory);
router.delete('/categories/:categoryId', deleteCategory);

// Service Routes
router.post('/services', createService);
router.get('/services', getServices);
router.get('/services/:serviceId', getServiceById);
router.put('/services/:serviceId', updateService);
// router.patch('/services/:serviceId', patchService);
router.delete('/services/:serviceId', deleteService);

module.exports = router;
