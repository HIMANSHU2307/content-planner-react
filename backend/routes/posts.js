const express = require('express');
const { readDataFile, writeDataFile } = require('../utils/dataStore');

const router = express.Router();
const FILE_NAME = 'posts.json';

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const { status, channelId, campaignId, search } = req.query;
    const statusFilters = status
      ? Array.isArray(status)
        ? status
        : [status]
      : [];
    const channelFilters = channelId
      ? Array.isArray(channelId)
        ? channelId
        : [channelId]
      : [];
    const campaignFilters = campaignId
      ? Array.isArray(campaignId)
        ? campaignId
        : [campaignId]
      : [];

    let posts = await readDataFile(FILE_NAME);

    if (statusFilters.length) {
      posts = posts.filter((p) => statusFilters.includes(p.status));
    }
    if (channelFilters.length) {
      posts = posts.filter((p) =>
        p.channelIds?.some((id) => channelFilters.includes(id))
      );
    }
    if (campaignFilters.length) {
      posts = posts.filter(
        (p) => p.campaignId && campaignFilters.includes(p.campaignId)
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchLower) ||
          p.content?.toLowerCase().includes(searchLower)
      );
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const posts = await readDataFile(FILE_NAME);
    const post = posts.find((p) => p.id === req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/posts
router.post('/', async (req, res) => {
  try {
    const posts = await readDataFile(FILE_NAME);
    const newPost = {
      id: Date.now().toString(),
      title: req.body.title || '',
      content: req.body.content || '',
      status: req.body.status || 'draft',
      channelIds: req.body.channelIds || [],
      campaignId: req.body.campaignId || null,
      publishDate: req.body.publishDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);
    await writeDataFile(FILE_NAME, posts);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  try {
    const posts = await readDataFile(FILE_NAME);
    const index = posts.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    posts[index] = {
      ...posts[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString(),
    };
    await writeDataFile(FILE_NAME, posts);
    res.json(posts[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const posts = await readDataFile(FILE_NAME);
    const filteredPosts = posts.filter((p) => p.id !== req.params.id);
    if (filteredPosts.length === posts.length) {
      return res.status(404).json({ error: 'Post not found' });
    }
    await writeDataFile(FILE_NAME, filteredPosts);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
