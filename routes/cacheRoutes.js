const express = require('express');

const router = express.Router();

const dao = require('../dao/cacheDB');

// GET

router.get('/:key', async (req, res, next) => {
  try {
    const items = await dao.getOrCreateItem(req);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const items = await dao.getAllItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// POST

router.post('/:key', async (req, res) => {
  res.send(`create cache item with key ${req.params.key}`);
});

// UPDATE

router.put('/:key', (req, res) => {
  res.send(`update cache item with key ${req.params.key}`);
});

// DELETE

router.delete('/:key', (req, res) => {
  res.send(`delete cache item with key ${req.params.key}`);
});

router.delete('/', (req, res) => {
  res.send('delete all cache items');
});

module.exports = router;
