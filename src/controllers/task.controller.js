const Task = require('../models/task.model');
const ApiResponse = require('../utils/api.response');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.error(res, { errors: errors.array() }, 400);
    }

    const task = new Task(req.body);
    await task.save();
    
    return ApiResponse.success(res, task, 201);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { completed } = req.query;
    const filter = {};
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    return ApiResponse.success(res, tasks);
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return ApiResponse.error(res, 'Tarea no encontrada', 404);
    }
    
    return ApiResponse.success(res, task);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.error(res, { errors: errors.array() }, 400);
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return ApiResponse.error(res, 'Tarea no encontrada', 404);
    }

    return ApiResponse.success(res, task);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return ApiResponse.error(res, 'Tarea no encontrada', 404);
    }

    return ApiResponse.success(res, { message: 'Tarea eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};