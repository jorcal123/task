class ApiResponse {
    static success(res, data, status = 200) {
      return res.status(status).json({
        success: true,
        data
      });
    }
  
    static error(res, message, status = 400) {
      return res.status(status).json({
        success: false,
        error: message
      });
    }
  }
  
  module.exports = ApiResponse;