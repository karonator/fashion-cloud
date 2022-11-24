const uuid = require('uuid');
const mongoose = require('mongoose');

const CacheItem = require('../models/cacheItem');

const connectToDB = () => (
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
);

const getOrCreateItem = async (req) => {
  const { key } = req.params;
  let result;

  try {
    result = await CacheItem.create(
      {
        key,
        value: uuid.v4()
      }
    );
  } catch (error) {
    console.log('process error');
  }

  return result;
};

const getAllItems = async () => {
  try {
    return await CacheItem.find().sort({ createdAt: -1 });
  } catch (error) {
    console.log('process error');
  }
};

module.exports = {
  connectToDB,
  getOrCreateItem,
  getAllItems
};
