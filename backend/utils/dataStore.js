/**
 * Data Store Utilities
 *
 * Shared helper functions for working with the file-based JSON storage.
 * Provides reusable read/write helpers and initialization logic so routes
 * can stay focused on request handling.
 */

const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

/**
 * Ensure the data directory exists before reading/writing files.
 */
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

/**
 * Read a JSON file from the data directory.
 * Returns an empty array if the file does not exist yet.
 */
async function readDataFile(filename) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Write JSON data to a file inside the data directory.
 */
async function writeDataFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Initialize seed data if the JSON files do not exist yet.
 */
async function initializeData() {
  await ensureDataDir();

  const files = {
    posts: 'posts.json',
    channels: 'channels.json',
    campaigns: 'campaigns.json',
    schedules: 'schedules.json',
  };

  try {
    await fs.access(path.join(DATA_DIR, files.posts));
  } catch {
    const initialPosts = [
      {
        id: '1',
        title: 'Welcome to Content Planner',
        content: 'This is your first post. Start planning your content!',
        status: 'draft',
        channelIds: ['1'],
        campaignId: '1',
        publishDate: new Date(Date.now() + 86400000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    await writeDataFile(files.posts, initialPosts);
  }

  try {
    await fs.access(path.join(DATA_DIR, files.channels));
  } catch {
    const initialChannels = [
      { id: '1', name: 'Instagram', type: 'social', color: '#E4405F' },
      { id: '2', name: 'Twitter', type: 'social', color: '#1DA1F2' },
      { id: '3', name: 'LinkedIn', type: 'professional', color: '#0077B5' },
      { id: '4', name: 'Blog', type: 'content', color: '#FF6B6B' },
    ];
    await writeDataFile(files.channels, initialChannels);
  }

  try {
    await fs.access(path.join(DATA_DIR, files.campaigns));
  } catch {
    const initialCampaigns = [
      {
        id: '1',
        name: 'Q1 Marketing Campaign',
        description: 'First quarter marketing initiatives',
        status: 'active',
      },
      {
        id: '2',
        name: 'Product Launch',
        description: 'New product announcement campaign',
        status: 'planning',
      },
    ];
    await writeDataFile(files.campaigns, initialCampaigns);
  }

  try {
    await fs.access(path.join(DATA_DIR, files.schedules));
  } catch {
    await writeDataFile(files.schedules, []);
  }
}

module.exports = {
  DATA_DIR,
  ensureDataDir,
  readDataFile,
  writeDataFile,
  initializeData,
};

