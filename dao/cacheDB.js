const mongoose = require('mongoose');

const CacheItem = require('../models/cacheItem');

const connectToDB = () => (
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
);

module.exports = {
  connectToDB
};
