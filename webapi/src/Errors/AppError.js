module.exports = class App extends Error {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.status = 500;
  }
};
