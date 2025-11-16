# Architecture Documentation

## System Overview

The Content Planner application is built using a modern, scalable architecture that separates concerns and promotes maintainability. This document provides a detailed breakdown of the system architecture, design decisions, and component interactions.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Components │  │  RTK Query   │  │   Redux      │  │
│  │  (Atomic)    │◄─┤  API Slice   │◄─┤   Store      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP/REST
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Backend (Node.js/Express)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Routes     │  │   Handlers  │  │   File I/O    │  │
│  │  (CRUD)      │─►│  (Business) │─►│   (Storage)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
                   JSON Files (data/)
```

## Frontend Architecture

### Component Hierarchy

The application follows **Atomic Design** principles:

```
Page (frontend/app/(dashboard)/dashboard/page.tsx)
│
├── Organisms (Complex UI)
│   ├── SummaryWidget
│   ├── SearchBar
│   ├── ViewSwitcher
│   ├── CalendarView
│   └── ListView
│
├── Molecules (Composed Components)
│   ├── PostCard
│   └── PostForm
│
└── Atoms (Basic Components)
    ├── Button
    ├── Input
    ├── Textarea
    ├── Select
    └── Badge
```

### Data Flow

1. **User Interaction** → Component Event Handler
2. **Component** → RTK Query Hook (e.g., `useCreatePostMutation`)
3. **RTK Query** → API Request → Backend
4. **Backend** → File I/O → JSON Storage
5. **Response** → RTK Query Cache Update
6. **Cache Update** → Component Re-render

### State Management Strategy

#### Server State (RTK Query)
- All API data managed by RTK Query
- Automatic caching and invalidation
- Loading and error states handled automatically

#### Client State (React State)
- UI state (view mode, form visibility, filters)
- Local component state
- No global client state needed (kept minimal)

### Component Communication

```
┌─────────────┐
│   Page      │ (Main orchestrator)
└──────┬──────┘
       │
       ├──► State Management (RTK Query)
       │
       ├──► Organisms (Complex UI)
       │    │
       │    ├──► Molecules (Composed)
       │    │    │
       │    │    └──► Atoms (Basic)
       │    │
       │    └──► Direct API calls via hooks
       │
       └──► Event Handlers
            │
            └──► Mutations/Queries
```

## Backend Architecture

### Request Flow

```
HTTP Request
    │
    ▼
Express Middleware (CORS, JSON parsing)
    │
    ▼
Route Handler
    │
    ▼
Business Logic (Validation, Transformation)
    │
    ▼
File I/O (Read/Write JSON)
    │
    ▼
Response (JSON)
```

### Data Storage

**File-based JSON Storage**:
- `backend/data/posts.json` - All posts
- `backend/data/channels.json` - All channels
- `backend/data/campaigns.json` - All campaigns
- `backend/data/schedules.json` - All schedules

**Advantages**:
- Simple setup, no database required
- Easy to inspect and modify
- Suitable for demonstration

**Limitations**:
- Not suitable for production scale
- No concurrent write protection
- No relationships or transactions

### API Design

**RESTful Principles**:
- Resource-based URLs (`/api/posts`, `/api/channels`)
- HTTP methods (GET, POST, PUT, DELETE)
- Status codes (200, 201, 404, 500)
- JSON request/response format

**Query Parameters**:
- Filtering via query params
- Search via query params
- No pagination (can be added)

## RTK Query Integration

### API Slice Configuration

```typescript
createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Post', 'Channel', 'Campaign', 'Schedule'],
  endpoints: (builder) => ({
    // Endpoints defined here
  })
})
```

### Cache Strategy

**Tag-based Invalidation**:
- Each entity type has a tag
- Mutations invalidate relevant tags
- Automatic refetch on invalidation

**Example**:
```typescript
createPost: builder.mutation({
  // ...
  invalidatesTags: [{ type: 'Post', id: 'LIST' }]
})
```

### Query Hooks

**Generated Hooks**:
- `useGetPostsQuery()` - Fetch all posts
- `useGetPostQuery(id)` - Fetch single post
- `useCreatePostMutation()` - Create post
- `useUpdatePostMutation()` - Update post
- `useDeletePostMutation()` - Delete post

**Usage Pattern**:
```typescript
const { data, isLoading, error } = useGetPostsQuery();
const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
```

## Type System

### Type Definitions

**Centralized Types** (`types/index.ts`):
- Entity types (Post, Channel, Campaign, Schedule)
- Enum types (PostStatus, ChannelType, etc.)
- Utility types (ViewMode, Direction, etc.)

**Benefits**:
- Single source of truth
- Type safety across application
- Easy to maintain and update

### Type Flow

```
TypeScript Types
    │
    ├──► Component Props
    ├──► API Request/Response
    ├──► Redux State
    └──► Utility Functions
```

## Styling Architecture

### SCSS Modules

**Scoped Styles**:
- Each component has its own `.module.scss` file
- Styles scoped to component
- No global style conflicts

**RTL Support**:
- `[dir='rtl']` selectors in all modules
- Layout adjustments for RTL
- Consistent across all components

### Style Organization

```
Component/
├── Component.tsx
├── Component.module.scss
└── index.ts
```

## Error Handling

### Frontend Error Handling

1. **API Errors**: Handled by RTK Query
   - Automatic error state
   - Can be accessed via hook

2. **Form Validation**: Client-side validation
   - Real-time error display
   - User-friendly messages

3. **Component Errors**: Try-catch blocks
   - Console logging (can be enhanced with error tracking)

### Backend Error Handling

1. **Validation**: Input validation before processing
2. **File Errors**: Try-catch for file operations
3. **HTTP Status Codes**: Appropriate status codes
4. **Error Messages**: Descriptive error responses

## Performance Considerations

### Frontend Optimizations

1. **Memoization**: `useMemo` for filtered posts
2. **Code Splitting**: Next.js automatic code splitting
3. **Caching**: RTK Query automatic caching
4. **Lazy Loading**: Can be added for large lists

### Backend Optimizations

1. **File Reading**: Cached in memory (can be enhanced)
2. **Response Size**: Only necessary data sent
3. **Error Handling**: Fast failure for invalid requests

## Security Considerations

### Current Implementation

- CORS enabled for development
- Input validation on backend
- Type safety on frontend

### Production Recommendations

1. **Authentication**: JWT tokens
2. **Authorization**: Role-based access
3. **Input Sanitization**: XSS prevention
4. **Rate Limiting**: Prevent abuse
5. **HTTPS**: Encrypted connections
6. **Environment Variables**: Secure config

## Scalability

### Current Limitations

- File-based storage (not scalable)
- No pagination
- No caching on backend
- Single instance only

### Scaling Path

1. **Database Migration**: PostgreSQL/MongoDB
2. **Pagination**: Limit results
3. **Caching Layer**: Redis
4. **Load Balancing**: Multiple instances
5. **CDN**: Static asset delivery

## Testing Strategy (Future)

### Unit Tests
- Component rendering
- Utility functions
- Redux reducers

### Integration Tests
- API endpoints
- Component interactions
- Data flow

### E2E Tests
- User workflows
- Critical paths
- Cross-browser testing

## Deployment Considerations

### Frontend
- Next.js static export (if static)
- Vercel/Netlify deployment
- Environment variables for API URL

### Backend
- Node.js server deployment
- PM2 for process management
- File system access required
- Database migration for production

## Conclusion

This architecture provides:
- **Maintainability**: Clear structure and separation
- **Scalability**: Room for growth
- **Type Safety**: TypeScript throughout
- **Performance**: Efficient caching and rendering
- **Developer Experience**: Clear patterns and documentation


