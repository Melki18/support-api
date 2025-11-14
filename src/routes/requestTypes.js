const express = require('express');
const RequestType = require('../models/RequestType');

const router = express.Router();

// GET all active
router.get('/', async (req, res) => {
  const list = await RequestType.find({ isActive: true });
  res.json(list);
});

// GET by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const item = await RequestType.findById(id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  return res.json(item);
});

// POST create
router.post('/', async (req, res) => {
  try {
    const newType = await RequestType.create(req.body);
    return res.status(201).json(newType);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;

// test change
