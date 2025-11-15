const express = require('express');
const { readDataFile, writeDataFile } = require('../utils/dataStore');

const router = express.Router();
const FILE_NAME = 'channels.json';

router.get('/', async (req, res) => {
  try {
    const channels = await readDataFile(FILE_NAME);
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const channels = await readDataFile(FILE_NAME);
    const channel = channels.find((c) => c.id === req.params.id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const channels = await readDataFile(FILE_NAME);
    const newChannel = {
      id: Date.now().toString(),
      name: req.body.name || '',
      type: req.body.type || 'social',
      color: req.body.color || '#000000',
    };
    channels.push(newChannel);
    await writeDataFile(FILE_NAME, channels);
    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const channels = await readDataFile(FILE_NAME);
    const index = channels.findIndex((c) => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    channels[index] = { ...channels[index], ...req.body, id: req.params.id };
    await writeDataFile(FILE_NAME, channels);
    res.json(channels[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const channels = await readDataFile(FILE_NAME);
    const filteredChannels = channels.filter((c) => c.id !== req.params.id);
    if (filteredChannels.length === channels.length) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    await writeDataFile(FILE_NAME, filteredChannels);
    res.json({ message: 'Channel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
