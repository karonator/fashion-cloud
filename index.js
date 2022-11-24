require('dotenv').config();

const express = require('express');

const cacheRoutes = require('./routes/cacheRoutes');
const dao = require('./dao/cacheDB');
const logger = require('./utils/logger');

dao.connectToDB()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded());
    app.use('/cache', cacheRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, (err) => {
      if (err) {
        logger.error('Express server startup failed');
      } else {
        logger.info(`Server listening on port ${PORT}`);
      }
    });
  })
  .catch(() => {
    logger.error('MongoDB connection failed');
    logger.error('Server startup terminated');
  });
