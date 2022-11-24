require('dotenv').config();

const express = require('express');

const app = express();

app.use('/cache', require('./routes/cacheRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Server startup failed');
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});
