const uuid = require('uuid');
const mongoose = require('mongoose');

const logger = require('../utils/logger');
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
    result = await CacheItem.findOneAndUpdate({ key }, {
      createdAt: new Date()
    }, { returnDocument: 'after' });
    if (result) {
      logger.info(`Cache hit: ${key}`);
    }
  } catch (error) {
    console.log('process error');
  }

  if (!result) {
    logger.info(`Cache miss: ${key}`);
    try {
      // here is potentially 2 db write operations, that imo should be wrapped to a transaction
      // it is not done, because transactions depends on MongoDB config,
      // with basic/local DB they'll not work

      const totalItems = await CacheItem.count();
      const limit = process.env.LIMIT || 3;

      if (totalItems >= limit) {
        await CacheItem.findOneAndDelete({}, {
          sort: {
            createdAt: 1
          }
        });
      }

      result = await CacheItem.create(
        {
          key,
          value: uuid.v4()
        }
      );
    } catch (error) {
      console.log('process error');
    }
  }

  return result;
};

const updateItem = async (req) => {
  const { key } = req.params;
  const { value } = req.body;

  try {
    if (!value) {
      return {
        code: 400,
        value: 'Cache item value not provided'
      };
    }

    const updated = await CacheItem.findOneAndUpdate({ key }, {
      createdAt: new Date(),
      value
    }, { returnDocument: 'after' });

    if (!updated) {
      return {
        code: 404,
        value: 'Cache item not found'
      };
    }

    return updated;
  } catch (error) {
    console.log('process error');
  }
};

const getAllItems = async () => {
  try {
    return await CacheItem.find().sort({ createdAt: -1 });
  } catch (error) {
    console.log('process error');
  }
};

const deleteItem = async (req) => {
  const { key } = req.params;

  try {
    const deleted = await CacheItem.findOneAndDelete({ keyqwe: 'asas' });
    if (!deleted) {
      return {
        code: 404,
        message: `Item not found for key: ${key}`
      };
    }
    return {
      code: 200,
      message: `Item deleted for key: ${key}`
    };
  } catch (error) {
    console.log('process error');
  }
};

const deleteAllItems = async () => {
  try {
    await CacheItem.deleteMany();
    return {
      message: 'All cache items deleted'
    };
  } catch (error) {
    console.log('process error');
  }
};

module.exports = {
  connectToDB,
  getOrCreateItem,
  getAllItems,
  updateItem,
  deleteItem,
  deleteAllItems
};
