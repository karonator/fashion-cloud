const express = require('express');

const router = express.Router();

const dao = require('../dao/cacheDB');

// GET

router.get('/:key', async (req, res, next) => {
  try {
    res.json(await dao.getOrCreateItem(req));
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    res.json(await dao.getAllItems());
  } catch (error) {
    next(error);
  }
});

// POST

router.post('/:key', async (req, res, next) => {
  try {
    res.json(await dao.getOrCreateItem(req));
  } catch (error) {
    next(error);
  }
});

// UPDATE

router.put('/:key', async (req, res, next) => {
  try {
    const result = await dao.updateItem(req);
    if ('code' in result) {
      const { code, value } = result;
      res.status(code).json({ message: value });
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE

router.delete('/:key', async (req, res, next) => {
  try {
    const { code, message } = await dao.deleteItem(req);
    res.status(code).json({ message });
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    res.json(await dao.deleteAllItems());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
