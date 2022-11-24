require('dotenv').config();

const express = require('express');

const cacheRoutes = require('./routes/cacheRoutes');
const dao = require('./dao/cacheDB');

dao.connectToDB()
  .then(() => {
    const app = express();

    app.use('/cache', cacheRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, (err) => {
      if (err) {
        // add logger later ...
        console.log('Server startup failed');
      } else {
        console.log(`Server listening on port ${PORT}`);
      }
    });
  })
  .catch(() => {
    console.log('db connection not ok');
  });
