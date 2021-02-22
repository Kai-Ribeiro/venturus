const AppError = require('./AppError');

module.exports = class NotFoundError extends AppError {
  constructor(message = 'The requested resource was not found') {
    super(message);

    this.status = 404;
  }
};
