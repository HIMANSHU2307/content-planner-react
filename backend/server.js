/**
 * Content Planner Backend Server
 *
 * Express server that exposes REST endpoints backed by file-based JSON storage.
 * Routes are organized by resource for clarity and maintainability.
 */

const express = require('express');
const cors = require('cors');
const { initializeData, DATA_DIR } = require('./utils/dataStore');

const postsRouter = require('./routes/posts');
const channelsRouter = require('./routes/channels');
const campaignsRouter = require('./routes/campaigns');
const schedulesRouter = require('./routes/schedules');

const app = express();
const PORT = 3001;

// Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Resource routes
app.use('/api/posts', postsRouter);
app.use('/api/channels', channelsRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/schedules', schedulesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Bootstrap server
async function startServer() {
  try {
    await initializeData();

    app.listen(PORT, () => {
      console.log(`🚀 Content Planner Backend running on http://localhost:${PORT}`);
      console.log(`📁 Data directory: ${DATA_DIR}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
