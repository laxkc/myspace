# Blog Admin Components

This directory contains modular components for the blog administration interface. The components are designed to be reusable, maintainable, and follow a clean separation of concerns.

## Component Structure

```
/blogs/
├── index.ts                 # Export all components
├── types.ts                 # Shared TypeScript interfaces and schemas
├── README.md               # This documentation
├── BlogRow.tsx             # Individual blog row component
├── BlogsTable.tsx          # Main table component
├── BlogFilters.tsx         # Search and filter controls
├── BulkActions.tsx         # Bulk operations bar
├── Pagination.tsx          # Pagination controls
├── BlogForm.tsx            # Add/Edit blog form modal
├── ImageSearchModal.tsx    # Unsplash image search modal
└── DeleteConfirmationModal.tsx # Delete confirmation modal
```

## Components Overview

### Core Components

- **`BlogRow.tsx`** - Renders a single blog entry in the table with actions
- **`BlogsTable.tsx`** - Main table component that displays all blogs
- **`BlogForm.tsx`** - Comprehensive form for adding/editing blogs with EditorJS integration

### UI Components

- **`BlogFilters.tsx`** - Search bar and filter controls (status, featured)
- **`BulkActions.tsx`** - Bulk operations bar for selected blogs
- **`Pagination.tsx`** - Page navigation controls
- **`DeleteConfirmationModal.tsx`** - Confirmation dialog for deletions
- **`ImageSearchModal.tsx`** - Unsplash image search and selection

### Shared Resources

- **`types.ts`** - TypeScript interfaces and Zod validation schemas
- **`index.ts`** - Barrel export for easy importing

## Usage

```tsx
import {
  BlogFilters,
  BulkActions,
  Pagination,
  DeleteConfirmationModal,
  BlogForm,
  BlogsTable,
} from "@/app/components/admin/blogs";
import { Blog, BlogFormData } from "@/app/components/admin/blogs/types";
```

## Key Features

### BlogForm Component
- **EditorJS Integration** - Rich text editor with multiple block types
- **Image Search** - Unsplash integration for cover images
- **Form Validation** - Zod schema validation with error handling
- **Auto-slug Generation** - Converts title to URL-friendly slug
- **Tag Management** - Add/remove tags with suggestions

### BlogsTable Component
- **Responsive Design** - Works on all screen sizes
- **Sorting & Filtering** - Multiple filter options
- **Bulk Operations** - Select multiple blogs for batch actions
- **Status Indicators** - Visual status badges
- **Action Buttons** - Edit and delete actions

### Image Search
- **Unsplash Integration** - Search high-quality stock photos
- **Loading States** - Proper loading indicators
- **Error Handling** - Graceful fallbacks for failed images
- **Attribution** - Proper Unsplash attribution

## State Management

The main page (`/admin/blogs/page.tsx`) manages all state and passes it down to components via props. This ensures:

- **Single Source of Truth** - All state in one place
- **Predictable Updates** - Clear data flow
- **Easy Testing** - Components are pure and testable
- **Reusability** - Components can be used in different contexts

## Benefits of This Structure

1. **Maintainability** - Each component has a single responsibility
2. **Reusability** - Components can be used in other parts of the app
3. **Testability** - Small, focused components are easier to test
4. **Performance** - Components can be optimized individually
5. **Developer Experience** - Clear separation makes code easier to understand
6. **Scalability** - Easy to add new features or modify existing ones

## Future Enhancements

- Add unit tests for each component
- Implement drag-and-drop for reordering blogs
- Add bulk import/export functionality
- Implement real-time collaboration features
- Add keyboard shortcuts for common actions 