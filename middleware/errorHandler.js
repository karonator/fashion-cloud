const logger = require('../utils/logger');

const handler = (error, req, res, next) => {
  if (error) {
    const { status, message } = error;
    if (status && message) {
      logger.error(message);
      res.status(status).json({ error: message });
    } else {
      next(error);
    }
  }
  next();
};

module.exports = handler;
