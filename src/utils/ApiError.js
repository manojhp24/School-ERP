class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    errorCode = null,
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.errors = errors;
    this.errorCode = errorCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
