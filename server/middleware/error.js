const errorHandler = (err, req, res, next) => {
  // Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    err = new Error(message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    err = new Error(message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err).map((val) => val.message);
    err = new Error(message);
  }

  console.log('Error middleware ', err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message ? err.message : err ? err : 'Server Error',
  });
};

export default errorHandler;
