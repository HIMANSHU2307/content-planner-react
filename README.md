# Content Planner - React/Next.js Application

A content planning and scheduling application built with React, Next.js, and RTK Query. This application demonstrates modern frontend development practices, including atomic design patterns, efficient state management, and comprehensive API integration.

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete posts, channels, campaigns, and schedules
- **Advanced Filtering**: Search and filter posts by status, channel, campaign, and text content
- **Dual View Modes**: Switch between list view and calendar view for different perspectives
- **Summary Dashboard**: Real-time statistics and analytics widget
- **RTL Support**: Built-in support for right-to-left languages
- **Atomic Design**: Well-structured component hierarchy for maintainability
- **RTK Query Integration**: Efficient data fetching with automatic caching and invalidation
- **TypeScript**: Full type safety throughout the application
- **SCSS Modules**: Scoped styling with SCSS for maintainable stylesheets

## 📁 Project Structure

```
content-planner-react/
├── frontend/              # Frontend application
│   ├── app/              # Next.js App Router
│   │   ├── _components/  # Shared app components
│   │   │   └── providers.tsx
│   │   ├── (dashboard)/  # Dashboard route group
│   │   │   ├── layout.tsx
│   │   │   └── dashboard/
│   │   │       ├── page.tsx
│   │   │       └── page.module.scss
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home redirect
│   │   └── globals.scss  # Global styles
│   ├── components/       # Atomic design components
│   │   ├── atoms/        # Basic building blocks
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Textarea/
│   │   │   ├── Select/
│   │   │   └── Badge/
│   │   ├── molecules/    # Composed components
│   │   │   ├── PostCard/
│   │   │   └── PostForm/
│   │   └── organisms/    # Complex components
│   │       ├── SummaryWidget/
│   │       ├── SearchBar/
│   │       ├── ViewSwitcher/
│   │       ├── CalendarView/
│   │       └── ListView/
│   ├── store/            # Redux store configuration
│   │   ├── apis/         # RTK Query API slices
│   │   ├── baseApi.ts    # Base API configuration
│   │   ├── store.ts      # Store setup
│   │   └── hooks.ts     # Typed Redux hooks
│   ├── types/            # TypeScript type definitions
│   ├── package.json      # Frontend dependencies
│   └── tsconfig.json     # TypeScript configuration
├── backend/              # Node.js Express backend
│   ├── server.js         # Express server with CRUD endpoints
│   ├── routes/           # API route handlers
│   ├── data/             # JSON file storage
│   ├── utils/            # Backend utilities
│   └── package.json      # Backend dependencies
└── package.json         # Root-level convenience scripts
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Redux Toolkit (RTK)**: State management
- **RTK Query**: Data fetching and caching
- **SCSS Modules**: Component-scoped styling
- **date-fns**: Date manipulation and formatting

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **File-based JSON storage**: Simple persistence layer

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. **Install all dependencies:**
```bash
# From project root - installs both frontend and backend
npm run install:all

# Or install separately:
cd frontend && npm install
cd ../backend && npm install
```

2. **Start the backend server:**
```bash
# From project root
npm run backend
# Or: cd backend && npm start
# Server runs on http://localhost:3001
```

3. **Start the frontend development server:**
```bash
# From project root
npm run dev
# Or: cd frontend && npm run dev
# Application runs on http://localhost:3000
```

## 🏗️ Architecture Overview

### Component Architecture (Atomic Design)

The application follows atomic design principles:

1. **Atoms**: Basic, indivisible components
   - `Button`: Reusable button with variants
   - `Input`: Form input with validation
   - `Textarea`: Multi-line text input
   - `Select`: Dropdown selection
   - `Badge`: Status indicator

2. **Molecules**: Simple combinations of atoms
   - `PostCard`: Displays post information
   - `PostForm`: Complete form for creating/editing posts

3. **Organisms**: Complex UI components
   - `SummaryWidget`: Statistics dashboard
   - `SearchBar`: Search and filter interface
   - `ViewSwitcher`: Toggle between views
   - `ListView`: Grid/list display
   - `CalendarView`: Calendar-based display

### State Management

The application uses **Redux Toolkit** with **RTK Query** for state management:

- **API Slices** (`store/apis/`): Centralized API configuration
  - Automatic caching with configurable cache times
  - Tag-based cache invalidation
  - Optimistic updates for better UX
  - Error handling

- **Store** (`store/store.ts`): Redux store configuration
  - RTK Query middleware integration
  - DevTools support in development

### Data Flow

1. **Component** triggers action (e.g., `useGetPostsQuery()`)
2. **RTK Query** checks cache first
3. If cache miss, **API request** is made to backend
4. **Backend** reads/writes JSON files
5. **Response** updates cache and component re-renders
6. **Cache invalidation** triggers refetch when needed

## 📡 API Endpoints

### Posts
- `GET /api/posts` - Get all posts (with optional query params: `status`, `channelId`, `campaignId`, `search`)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Channels
- `GET /api/channels` - Get all channels
- `GET /api/channels/:id` - Get single channel
- `POST /api/channels` - Create new channel
- `PUT /api/channels/:id` - Update channel
- `DELETE /api/channels/:id` - Delete channel

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get single campaign
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

### Schedules
- `GET /api/schedules` - Get all schedules (with optional query params: `postId`, `startDate`, `endDate`)
- `POST /api/schedules` - Create new schedule
- `DELETE /api/schedules/:id` - Delete schedule

## 🎨 Component Documentation

### Atoms

#### Button
**Location**: `frontend/components/atoms/Button/Button.tsx`

A versatile button component with multiple variants and sizes.

**Props**:
- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost'
- `size`: 'small' | 'medium' | 'large'
- `isLoading`: boolean
- Standard HTML button attributes

**Usage**:
```tsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

#### Input
**Location**: `frontend/components/atoms/Input/Input.tsx`

Form input with label, error, and helper text support.

**Props**:
- `label`: string (optional)
- `error`: string (optional)
- `helperText`: string (optional)
- Standard HTML input attributes

**Usage**:
```tsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

### Molecules

#### PostCard
**Location**: `frontend/components/molecules/PostCard/PostCard.tsx`

Displays a post in a card format with status, channels, and actions.

**Props**:
- `post`: Post object
- `channels`: Array of Channel objects
- `onEdit`: (post: Post) => void (optional)
- `onDelete`: (postId: string) => void (optional)

#### PostForm
**Location**: `frontend/components/molecules/PostForm/PostForm.tsx`

Complete form for creating and editing posts with validation.

**Props**:
- `post`: Post object (optional, for editing)
- `channels`: Array of Channel objects
- `campaigns`: Array of Campaign objects
- `onSubmit`: (data: Partial<Post>) => void
- `onCancel`: () => void (optional)
- `isLoading`: boolean (optional)

### Organisms

#### SummaryWidget
**Location**: `frontend/components/organisms/SummaryWidget/SummaryWidget.tsx`

Displays key statistics about content planning.

**Props**:
- `posts`: Array of Post objects
- `channels`: Array of Channel objects

**Features**:
- Total posts count
- Posts by status
- Upcoming scheduled posts
- Channel distribution

#### SearchBar
**Location**: `frontend/components/organisms/SearchBar/SearchBar.tsx`

Provides search and filter functionality.

**Props**:
- `searchQuery`: string
- `statusFilter`: PostStatus (optional)
- `channelFilter`: string (optional)
- `campaignFilter`: string (optional)
- `channels`: Array of Channel objects
- `campaigns`: Array of Campaign objects
- Filter change handlers
- `onClearFilters`: () => void

#### CalendarView
**Location**: `frontend/components/organisms/CalendarView/CalendarView.tsx`

Displays posts grouped by date in a calendar format.

**Props**:
- `posts`: Array of Post objects
- `channels`: Array of Channel objects
- `onEdit`: (post: Post) => void (optional)
- `onDelete`: (postId: string) => void (optional)

#### ListView
**Location**: `frontend/components/organisms/ListView/ListView.tsx`

Displays posts in a responsive grid layout.

**Props**:
- `posts`: Array of Post objects
- `channels`: Array of Channel objects
- `onEdit`: (post: Post) => void (optional)
- `onDelete`: (postId: string) => void (optional)

## 🔄 How It Works

### Creating a Post

1. User clicks "New Post" button
2. `PostForm` component is displayed in sidebar
3. User fills in title, content, selects channels, etc.
4. Form validation runs on submit
5. `useCreatePostMutation()` is called
6. RTK Query sends POST request to `/api/posts`
7. Backend saves to `backend/data/posts.json`
8. Cache is invalidated and posts list refetches
9. Form closes and new post appears in list

### Filtering Posts

1. User enters search query or selects filters
2. `filteredPosts` useMemo recalculates
3. Only matching posts are displayed
4. Filters persist until cleared

### View Switching

1. User clicks view switcher (List/Calendar)
2. `viewMode` state updates
3. Conditional rendering shows appropriate view component
4. Same filtered posts displayed in different format

### Cache Management

RTK Query automatically:
- Caches API responses
- Invalidates cache on mutations
- Refetches when tags are invalidated
- Provides loading and error states

## 🌍 RTL Support

The application includes RTL (Right-to-Left) support for languages like Arabic and Hebrew:

- CSS `[dir='rtl']` selectors in all SCSS modules
- Layout adjustments for RTL direction
- Text alignment and flex direction reversals

To enable RTL, set `dir="rtl"` on the HTML element in `frontend/app/layout.tsx`.

## 🚧 Future Improvements

### Potential Enhancements

1. **Authentication & Authorization**
   - User login/registration
   - Role-based access control
   - Multi-user support

2. **Advanced Features**
   - Drag-and-drop for reordering
   - Bulk operations (delete, status change)
   - Export/import functionality
   - Rich text editor for content
   - Image uploads and media management

3. **Performance**
   - Virtual scrolling for large lists
   - Pagination or infinite scroll
   - Service worker for offline support
   - Image optimization

4. **Testing**
   - Unit tests for components
   - Integration tests for API
   - E2E tests with Playwright/Cypress

5. **Database Migration**
   - Replace file-based storage with PostgreSQL/MongoDB
   - Add proper indexing and relationships
   - Implement transactions

6. **Real-time Updates**
   - WebSocket integration
   - Live collaboration features
   - Push notifications

7. **Analytics**
   - Post performance metrics
   - Engagement tracking
   - Reporting dashboard

## 🐛 Error Handling

The application includes error handling at multiple levels:

- **API Level**: Backend validates input and returns appropriate error codes
- **RTK Query**: Automatic error state management
- **Component Level**: Form validation with user-friendly error messages
- **User Feedback**: Error messages displayed in UI (can be enhanced with toast notifications)

## 📝 Code Quality

- **TypeScript**: Full type safety
- **Comments**: Comprehensive JSDoc comments
- **Consistent Naming**: Clear, descriptive names
- **SCSS Modules**: Scoped styles prevent conflicts
- **Component Structure**: Atomic design for maintainability
- **Error Prone Prevention**: Type checking, validation, null checks

## 🎯 Key Demonstrations

This application demonstrates:

1. **Architecture**
   - Atomic design pattern
   - Separation of concerns
   - Scalable structure

2. **Modern React Patterns**
   - Hooks-based components
   - Custom hooks (via RTK Query)
   - Memoization for performance

3. **State Management**
   - RTK Query for server state
   - Efficient caching strategies
   - Optimistic updates

4. **Type Safety**
   - Comprehensive TypeScript types
   - Type-safe API calls
   - Type-safe component props

5. **Code Organization**
   - Clear file structure
   - Reusable components
   - Centralized configuration

6. **Best Practices**
   - Accessibility considerations
   - RTL support
   - Error handling
   - Loading states
   - Responsive design

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Author

Built as a portfolio project By Himanshu Sharma.

---

**Note**: This is a demonstration application. For production use, consider adding authentication, database migration, comprehensive testing, and additional security measures.

