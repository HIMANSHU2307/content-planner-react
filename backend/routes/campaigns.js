const express = require('express');
const { readDataFile, writeDataFile } = require('../utils/dataStore');

const router = express.Router();
const FILE_NAME = 'campaigns.json';

router.get('/', async (req, res) => {
  try {
    const campaigns = await readDataFile(FILE_NAME);
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const campaigns = await readDataFile(FILE_NAME);
    const campaign = campaigns.find((c) => c.id === req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const campaigns = await readDataFile(FILE_NAME);
    const newCampaign = {
      id: Date.now().toString(),
      name: req.body.name || '',
      description: req.body.description || '',
      status: req.body.status || 'planning',
    };
    campaigns.push(newCampaign);
    await writeDataFile(FILE_NAME, campaigns);
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const campaigns = await readDataFile(FILE_NAME);
    const index = campaigns.findIndex((c) => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    campaigns[index] = { ...campaigns[index], ...req.body, id: req.params.id };
    await writeDataFile(FILE_NAME, campaigns);
    res.json(campaigns[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const campaigns = await readDataFile(FILE_NAME);
    const filteredCampaigns = campaigns.filter((c) => c.id !== req.params.id);
    if (filteredCampaigns.length === campaigns.length) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    await writeDataFile(FILE_NAME, filteredCampaigns);
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
