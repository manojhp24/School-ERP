const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const resposne = {
    success: false,
    message: err.message || "Internal Server Error",
    errorCode: err.errorCode || null,
  };

  if (err.errors?.length > 0) {
    resposne.errors = err.errors;
  }
  res.status(statusCode).json(resposne);
};

export { errorHandler };
