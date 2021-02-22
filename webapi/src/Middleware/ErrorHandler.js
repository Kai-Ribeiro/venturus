module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || err.statusCode || 500).json({
    description: err.message,
    messages: err.validationErrors,
  });
};
