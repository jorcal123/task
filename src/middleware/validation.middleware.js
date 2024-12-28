const { body, param, query } = require('express-validator');

exports.createTaskValidation = [
  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El título debe tener entre 1 y 100 caracteres'),
  body('description')
    .optional()
    .trim(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser un valor booleano')
];

exports.updateTaskValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID de tarea inválido'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El título debe tener entre 1 y 100 caracteres'),
  body('description')
    .optional()
    .trim(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser un valor booleano')
];

exports.getTaskValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID de tarea inválido')
];

exports.filterTasksValidation = [
  query('completed')
    .optional()
    .isBoolean()
    .withMessage('El filtro de estado debe ser un valor booleano')
];
