# Component Guide

This document provides a detailed guide to all components in the Content Planner application, organized by the atomic design hierarchy.

## Component Hierarchy

```
Atoms (Basic Building Blocks)
  ├── Button
  ├── Input
  ├── Textarea
  ├── Select
  └── Badge

Molecules (Composed Components)
  ├── PostCard
  └── PostForm

Organisms (Complex Components)
  ├── SummaryWidget
  ├── SearchBar
  ├── ViewSwitcher
  ├── CalendarView
  └── ListView
```

## Atoms

### Button

**Location**: `components/atoms/Button/Button.tsx`

**Purpose**: Reusable button component with multiple variants and states.

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  children: React.ReactNode;
  // ... standard HTML button attributes
}
```

**Variants**:
- `primary`: Blue background, white text (default actions)
- `secondary`: Gray background (secondary actions)
- `danger`: Red background (destructive actions)
- `ghost`: Transparent background (subtle actions)

**Sizes**:
- `small`: Compact button
- `medium`: Standard size (default)
- `large`: Larger button

**Features**:
- Loading state with spinner
- Disabled state
- Focus styles for accessibility
- RTL support

**Usage Example**:
```tsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Save Post
</Button>

<Button variant="danger" isLoading={isDeleting} onClick={handleDelete}>
  Delete
</Button>
```

---

### Input

**Location**: `components/atoms/Input/Input.tsx`

**Purpose**: Form input field with label, error, and helper text support.

**Props**:
```typescript
interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  // ... standard HTML input attributes
}
```

**Features**:
- Optional label
- Error message display
- Helper text support
- Accessibility attributes (aria-invalid, aria-describedby)
- RTL support

**Usage Example**:
```tsx
<Input
  label="Post Title"
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  error={errors.title}
  required
/>

<Input
  label="Publish Date"
  type="datetime-local"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  helperText="Schedule when this post should be published"
/>
```

---

### Textarea

**Location**: `components/atoms/Textarea/Textarea.tsx`

**Purpose**: Multi-line text input for longer content.

**Props**:
```typescript
interface TextareaProps {
  label?: string;
  error?: string;
  helperText?: string;
  // ... standard HTML textarea attributes
}
```

**Features**:
- Same features as Input
- Vertical resize capability
- Minimum height for usability

**Usage Example**:
```tsx
<Textarea
  label="Content"
  value={content}
  onChange={(e) => setContent(e.target.value)}
  rows={6}
  error={errors.content}
  required
/>
```

---

### Select

**Location**: `components/atoms/Select/Select.tsx`

**Purpose**: Dropdown selection component.

**Props**:
```typescript
interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  // ... standard HTML select attributes
}

interface SelectOption {
  value: string;
  label: string;
}
```

**Features**:
- Dynamic options
- Label and error support
- RTL support

**Usage Example**:
```tsx
<Select
  label="Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  options={[
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
  ]}
/>
```

---

### Badge

**Location**: `components/atoms/Badge/Badge.tsx`

**Purpose**: Small status indicator or label.

**Props**:
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';
}
```

**Variants**:
- `default`: Gray (neutral)
- `success`: Green (positive)
- `warning`: Yellow (caution)
- `danger`: Red (error)
- `info`: Blue (information)

**Usage Example**:
```tsx
<Badge variant="success">Published</Badge>
<Badge variant="warning" size="small">Draft</Badge>
```

---

## Molecules

### PostCard

**Location**: `components/molecules/PostCard/PostCard.tsx`

**Purpose**: Displays a post in a card format with all relevant information.

**Props**:
```typescript
interface PostCardProps {
  post: Post;
  channels: Channel[];
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}
```

**Features**:
- Post title and content preview
- Status badge
- Channel tags with colors
- Publish date display
- Edit and delete actions
- Hover effects

**Usage Example**:
```tsx
<PostCard
  post={post}
  channels={channels}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

---

### PostForm

**Location**: `components/molecules/PostForm/PostForm.tsx`

**Purpose**: Complete form for creating and editing posts.

**Props**:
```typescript
interface PostFormProps {
  post?: Post; // Optional, for editing
  channels: Channel[];
  campaigns: Campaign[];
  onSubmit: (data: Partial<Post>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}
```

**Features**:
- Title and content fields
- Status selection
- Multi-channel selection (checkboxes)
- Campaign association
- Publish date picker
- Form validation
- Loading state

**Form Fields**:
1. Title (required)
2. Content (required)
3. Status (dropdown)
4. Channels (multi-select checkboxes)
5. Campaign (optional dropdown)
6. Publish Date (optional datetime picker)

**Usage Example**:
```tsx
<PostForm
  post={editingPost}
  channels={channels}
  campaigns={campaigns}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  isLoading={isSaving}
/>
```

---

## Organisms

### SummaryWidget

**Location**: `components/organisms/SummaryWidget/SummaryWidget.tsx`

**Purpose**: Displays key statistics and metrics about content planning.

**Props**:
```typescript
interface SummaryWidgetProps {
  posts: Post[];
  channels: Channel[];
}
```

**Statistics Displayed**:
1. Total Posts count
2. Drafts count
3. Scheduled count
4. Published count
5. Upcoming posts count
6. Channel distribution (visual breakdown)

**Features**:
- Real-time calculations
- Color-coded statistics
- Channel distribution visualization
- Responsive grid layout

**Usage Example**:
```tsx
<SummaryWidget posts={posts} channels={channels} />
```

---

### SearchBar

**Location**: `components/organisms/SearchBar/SearchBar.tsx`

**Purpose**: Provides search and filter functionality for posts.

**Props**:
```typescript
interface SearchBarProps {
  searchQuery: string;
  statusFilter?: PostStatus;
  channelFilter?: string;
  campaignFilter?: string;
  channels: Channel[];
  campaigns: Campaign[];
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status?: PostStatus) => void;
  onChannelFilterChange: (channelId?: string) => void;
  onCampaignFilterChange: (campaignId?: string) => void;
  onClearFilters: () => void;
}
```

**Features**:
- Text search input
- Status filter dropdown
- Channel filter dropdown
- Campaign filter dropdown
- Clear filters button (appears when filters active)

**Usage Example**:
```tsx
<SearchBar
  searchQuery={searchQuery}
  statusFilter={statusFilter}
  channelFilter={channelFilter}
  campaignFilter={campaignFilter}
  channels={channels}
  campaigns={campaigns}
  onSearchChange={setSearchQuery}
  onStatusFilterChange={setStatusFilter}
  onChannelFilterChange={setChannelFilter}
  onCampaignFilterChange={setCampaignFilter}
  onClearFilters={handleClearFilters}
/>
```

---

### ViewSwitcher

**Location**: `components/organisms/ViewSwitcher/ViewSwitcher.tsx`

**Purpose**: Allows users to switch between list and calendar views.

**Props**:
```typescript
interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}
```

**Features**:
- Toggle between 'list' and 'calendar' views
- Active state indication
- Accessible tab interface

**Usage Example**:
```tsx
<ViewSwitcher
  currentView={viewMode}
  onViewChange={setViewMode}
/>
```

---

### ListView

**Location**: `components/organisms/ListView/ListView.tsx`

**Purpose**: Displays posts in a responsive grid layout.

**Props**:
```typescript
interface ListViewProps {
  posts: Post[];
  channels: Channel[];
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}
```

**Features**:
- Responsive grid (auto-fill, min 350px columns)
- Empty state message
- Uses PostCard molecules

**Usage Example**:
```tsx
<ListView
  posts={filteredPosts}
  channels={channels}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

---

### CalendarView

**Location**: `components/organisms/CalendarView/CalendarView.tsx`

**Purpose**: Displays posts grouped by date in a calendar format.

**Props**:
```typescript
interface CalendarViewProps {
  posts: Post[];
  channels: Channel[];
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}
```

**Features**:
- Groups posts by publish date (or created date)
- Date headers with formatting
- "Today" badge for current date
- Post count per day
- Uses PostCard molecules
- Empty state message

**Date Grouping Logic**:
- Uses `publishDate` if available
- Falls back to `createdAt` if no publish date
- Groups by day (yyyy-MM-dd format)

**Usage Example**:
```tsx
<CalendarView
  posts={filteredPosts}
  channels={channels}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

---

## Component Composition Examples

### Creating a New Post Flow

```
Page Component
  ├── Button ("New Post") → Opens form
  ├── PostForm (in sidebar)
  │   ├── Input (title)
  │   ├── Textarea (content)
  │   ├── Select (status)
  │   ├── Channel checkboxes
  │   ├── Select (campaign)
  │   └── Input (publish date)
  └── Button (Submit) → Triggers mutation
```

### Displaying Posts Flow

```
Page Component
  ├── SummaryWidget (statistics)
  ├── SearchBar (filters)
  │   ├── Input (search)
  │   └── Select components (filters)
  └── ViewSwitcher → ListView or CalendarView
      └── PostCard (for each post)
          ├── Badge (status)
          ├── Channel tags
          └── Button components (actions)
```

## Styling

All components use **SCSS Modules** for scoped styling:

- Each component has its own `.module.scss` file
- Styles are scoped to the component
- RTL support via `[dir='rtl']` selectors
- Consistent design system (colors, spacing, typography)

## Best Practices

1. **Composition**: Build complex components from simpler ones
2. **Reusability**: Atoms should be highly reusable
3. **Props**: Use TypeScript interfaces for all props
4. **Accessibility**: Include ARIA attributes where needed
5. **RTL**: All components support RTL layout
6. **Error Handling**: Display errors clearly to users
7. **Loading States**: Show loading indicators for async operations

## Extending Components

To add a new component:

1. **Atom**: Create in `components/atoms/ComponentName/`
2. **Molecule**: Create in `components/molecules/ComponentName/`
3. **Organism**: Create in `components/organisms/ComponentName/`

Each component should have:
- `ComponentName.tsx` - Component file
- `ComponentName.module.scss` - Styles
- `index.ts` - Exports

Follow the existing patterns for consistency!

