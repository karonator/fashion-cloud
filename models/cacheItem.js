const mongoose = require('mongoose');

const cacheItemSchema = new mongoose.Schema({
  key: String,
  value: String,
  createdAt: {
    type: Date,
    expires: `${process.env.TTL || 5}sec`,
    default: Date.now
  }
}, {
  collection: 'cache'
});

module.exports = mongoose.model('CacheItem', cacheItemSchema);
