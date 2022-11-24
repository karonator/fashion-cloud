const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = null;

const connectToTestDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = await mongo.getUri();
  await mongoose.connect(uri);
};

const clearTestDB = async () => {
  const { db } = mongoose.connection;
  const collections = await db.listCollections().toArray();

  collections
    .map((collection) => collection.name)
    .forEach(async (collectionName) => {
      db.dropCollection(collectionName);
    });
};

const dropTestDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

module.exports = {
  connectToTestDB,
  clearTestDB,
  dropTestDB
};
