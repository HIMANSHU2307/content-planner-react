# Quick Start Guide

Get the Content Planner application up and running in minutes!

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

## Step-by-Step Setup

### 1. Install Dependencies

**Frontend:**
```bash
cd content-planner-react
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Start the Backend Server

From the `backend` directory:
```bash
npm start
```

The backend will start on `http://localhost:3001`

**What happens:**
- Server initializes
- Creates `data/` directory if it doesn't exist
- Initializes JSON files with sample data
- API endpoints become available

### 3. Start the Frontend

From the project root (`content-planner-react`):
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Open the Application

Navigate to `http://localhost:3000` in your browser.

## First Steps

1. **View the Dashboard**: You'll see the summary widget with statistics
2. **Explore Posts**: Browse the sample post in list or calendar view
3. **Create a Post**: Click "New Post" to create your first content
4. **Filter Posts**: Use the search bar to filter by status, channel, or campaign
5. **Switch Views**: Toggle between list and calendar views

## Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Ensure Node.js is installed: `node --version`
- Check backend dependencies: `cd backend && npm install`

### Frontend won't start
- Check if port 3000 is available
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`

### API calls failing
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify API URL in `store/apiSlice.ts`

### No data showing
- Check backend data files in `backend/data/`
- Restart backend to reinitialize data
- Check browser network tab for API errors

## Development Commands

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start server
- `npm run dev` - Start with auto-reload (if using nodemon)

## Project Structure Overview

```
content-planner-react/
├── app/              # Next.js pages
├── components/       # React components (atomic design)
├── store/           # Redux store and RTK Query
├── types/           # TypeScript definitions
└── backend/         # Node.js Express server
```

## Next Steps

- Read `README.md` for detailed documentation
- Check `ARCHITECTURE.md` for system design
- Explore components in `components/` directory
- Review API endpoints in `backend/server.js`

## Need Help?

- Check the main `README.md` for comprehensive documentation
- Review `ARCHITECTURE.md` for system design details
- Examine component files for inline documentation

Happy coding! 🚀

