const express = require('express');
const { readDataFile, writeDataFile } = require('../utils/dataStore');

const router = express.Router();
const FILE_NAME = 'schedules.json';

router.get('/', async (req, res) => {
  try {
    const { postId, startDate, endDate } = req.query;
    let schedules = await readDataFile(FILE_NAME);

    if (postId) {
      schedules = schedules.filter((s) => s.postId === postId);
    }
    if (startDate) {
      schedules = schedules.filter((s) => s.scheduledDate >= startDate);
    }
    if (endDate) {
      schedules = schedules.filter((s) => s.scheduledDate <= endDate);
    }

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const schedules = await readDataFile(FILE_NAME);
    const newSchedule = {
      id: Date.now().toString(),
      postId: req.body.postId,
      channelId: req.body.channelId,
      scheduledDate: req.body.scheduledDate,
      status: req.body.status || 'pending',
      createdAt: new Date().toISOString(),
    };
    schedules.push(newSchedule);
    await writeDataFile(FILE_NAME, schedules);
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const schedules = await readDataFile(FILE_NAME);
    const filteredSchedules = schedules.filter((s) => s.id !== req.params.id);
    if (filteredSchedules.length === schedules.length) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    await writeDataFile(FILE_NAME, filteredSchedules);
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
