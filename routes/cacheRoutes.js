const express = require('express');

const router = express.Router();

// GET

router.get('/:key', async (req, res) => {
  res.send(`get cache item with key ${req.params.key}`);
});

router.get('/', async (req, res) => {
  res.send('get all cache items');
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
