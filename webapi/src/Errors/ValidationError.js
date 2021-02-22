const AppError = require('./AppError');

module.exports = class ValidationError extends AppError {
  constructor(validationErrors, message = 'The validation did not pass') {
    super(message);

    this.status = 422;
    this.validationErrors = validationErrors;
  }
};
