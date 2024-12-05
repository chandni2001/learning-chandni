const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');


const sanitizeText = (text) => {
    const cleanText = sanitizeHtml(text, { allowedTags: [] });
    return cleanText.replace(/[^a-zA-Z\s]/g, ''); 
  };

  router.post(
    '/',
    [
      body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
      body('status')
        .trim()
        .notEmpty().withMessage('Status is required')
        .isString().withMessage('Status must be a string'),
      body('description')
        .optional()
        .trim()
        .isString().withMessage('Description must be a string')
        .customSanitizer(value => sanitizeText(value)), 
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { name, status, description } = req.body;
  
        const newTodo = new Todo({
          name,
          status,
          description,
        });
  
        const result = await newTodo.save();
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
  );


router.get('/', async (req, res, next) => {
    try {
        let todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', [
    body('name')
      .optional()
      .trim()
      .isString().withMessage('Name must be a string'),
    body('status')
      .optional()
      .trim()
      .isString().withMessage('Status must be a string'),
    body('description')
      .optional()
      .trim()
      .isString().withMessage('Description must be a string')
      .customSanitizer(value => sanitizeText(value)), 
  ], async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      let { name, status, description } = req.body;
      let updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { name, status, description },
        { new: true }
      );
      if (updatedTodo) {
        res.json(updatedTodo);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id', async (req, res, next) => {
    try {
        let result = await Todo.findByIdAndDelete(req.params.id);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;