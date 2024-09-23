const { body, param,check, validationResult } = require('express-validator');
const Category = require('../models/Category');
const Service = require('../models/Service');


const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};


exports.validateCategory = [
    body('name').trim().notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('description').optional().trim().isString().withMessage('Description must be a string'),
    body('services').optional().isArray().withMessage('Services must be an array of service IDs'),
    body('services.*').optional().isMongoId().withMessage('Each service ID must be a valid Mongo ID'),
];

exports.validateService = [
    body('name').trim().notEmpty().withMessage('Service name is required').isString().withMessage('Service name must be a string'),
    body('description').optional().trim().isString().withMessage('Description must be a string'),
];


exports.createCategory = [
    this.validateCategory,
    async (req, res) => {
        handleValidationErrors(req, res);

        const { name, description, services } = req.body;

        try {
            let category = await Category.findOne({ name });
            if (category) {
                return res.status(400).json({ msg: 'Category already exists' });
            }

            const serviceIds = await Promise.all(
                services.map(async (serviceId) => {
                    const service = await Service.findById(serviceId);
                    if (!service) {
                        throw new Error(`Invalid Service ID: ${serviceId}`);
                    }
                    return service._id;
                })
            );

            category = new Category({ name, description, services: serviceIds });
            await category.save();
            res.json(category);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    }
];


exports.getCategoriesWithServices = async (req, res) => {
    try {
        const categories = await Category.find().populate('services');
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};


exports.getCategoryById = [
    param('categoryId').isMongoId().withMessage('Invalid Category ID'),
    async (req, res) => {
        handleValidationErrors(req, res);

        try {
            const category = await Category.findById(req.params.categoryId).populate('services');
            if (!category) return res.status(404).json({ msg: 'Category not found' });
            res.json(category);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    }
];


exports.updateCategory = [
    this.validateCategory,
    async (req, res) => {
        handleValidationErrors(req, res);

        const { name, description, services } = req.body;

        try {
            let category = await Category.findById(req.params.categoryId);
            if (!category) return res.status(404).json({ msg: 'Category not found' });

            if (name) category.name = name;
            if (description) category.description = description;

            if (services && services.length > 0) {
                const serviceIds = await Promise.all(
                    services.map(async (serviceId) => {
                        const service = await Service.findById(serviceId);
                        if (!service) throw new Error(`Invalid Service ID: ${serviceId}`);
                        return service._id;
                    })
                );
                category.services = [...new Set([...category.services, ...serviceIds])];
            }

            await category.save();
            res.json(category);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    }
];



exports.deleteCategory = [
  check('categoryId')
      .isMongoId().withMessage('Invalid Category ID')
      .trim()
      .escape(),
  async (req, res) => {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      try {
          let category = await Category.findById(req.params.categoryId);
          if (!category) return res.status(404).json({ msg: 'Category not found' });

          await category.deleteOne();
          res.json({ msg: 'Category removed' });
      } catch (err) {
          console.error(err.message);
          res.status(500).json({ msg: 'Server error', error: err.message });
      }
  }
];


exports.createService = [
    this.validateService,
    async (req, res) => {
        handleValidationErrors(req, res);

        const { name, description } = req.body;

        try {
            let service = await Service.findOne({ name });
            if (service) return res.status(400).json({ msg: 'Service already exists' });

            service = new Service({ name, description });
            await service.save();
            res.json(service);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    }
];


exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};


const validateId = param('serviceId').isMongoId().withMessage('Invalid ID');


exports.getServiceById = [
    validateId,
    async (req, res) => {
        handleValidationErrors(req, res);

        try {
            const service = await Service.findById(req.params.serviceId);
            if (!service) return res.status(404).json({ msg: 'Service not found' });
            res.json(service);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    }
];


exports.updateService = [
    this.validateService,
    validateId,
    async (req, res) => {
        handleValidationErrors(req, res);

        const { name, description } = req.body;

        try {
            let service = await Service.findById(req.params.serviceId);
            if (!service) return res.status(404).json({ msg: 'Service not found' });

            if (name) service.name = name;
            if (description) service.description = description;

            await service.save();
            res.json(service);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    }
];


exports.deleteService = [
    validateId,
    async (req, res) => {
        handleValidationErrors(req, res);

        try {
            let service = await Service.findById(req.params.serviceId);
            if (!service) return res.status(404).json({ msg: 'Service not found' });

            await service.deleteOne();
            res.json({ msg: 'Service removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error', error: err.message });
        }
    }
];


