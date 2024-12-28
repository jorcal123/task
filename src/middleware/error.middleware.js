const ApiResponse = require('../utils/api.response');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return ApiResponse.error(res, err.message, 400);
  }

  if (err.name === 'CastError') {
    return ApiResponse.error(res, 'Recurso no encontrado', 404);
  }

  return ApiResponse.error(
    res,
    'Error interno del servidor',
    500
  );
};

module.exports = errorHandler;