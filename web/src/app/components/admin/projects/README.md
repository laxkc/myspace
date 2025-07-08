# Project Admin Components

This directory contains modular components for the project administration interface. The components are designed to be reusable, maintainable, and follow a clean separation of concerns.

## Component Structure

```
/projects/
├── index.ts                 # Export all components
├── types.ts                 # Shared TypeScript interfaces and schemas
├── README.md               # This documentation
├── ProjectRow.tsx          # Individual project row component
├── ProjectsTable.tsx       # Main table component
├── ProjectFilters.tsx      # Search and filter controls
├── BulkActions.tsx         # Bulk operations bar
├── Pagination.tsx          # Pagination controls
├── ProjectForm.tsx         # Add/Edit project form modal
└── DeleteConfirmationModal.tsx # Delete confirmation modal
```

## Components Overview

### Core Components

- **`ProjectRow.tsx`** - Renders a single project entry in the table with actions
- **`ProjectsTable.tsx`** - Main table component that displays all projects
- **`ProjectForm.tsx`** - Comprehensive form for adding/editing projects

### UI Components

- **`ProjectFilters.tsx`** - Search bar and filter controls (status, featured)
- **`BulkActions.tsx`** - Bulk operations bar for selected projects
- **`Pagination.tsx`** - Page navigation controls
- **`DeleteConfirmationModal.tsx`** - Confirmation dialog for deletions

### Shared Resources

- **`types.ts`** - TypeScript interfaces and Zod validation schemas
- **`index.ts`** - Barrel export for easy importing

## Usage

```tsx
import {
  ProjectFilters,
  BulkActions,
  Pagination,
  DeleteConfirmationModal,
  ProjectForm,
  ProjectsTable,
  Project,
  ProjectFormData,
} from "@/app/components/admin/projects";
```

## Key Features

### ProjectForm Component
- **Form Validation** - Zod schema validation with error handling
- **Auto-slug Generation** - Converts title to URL-friendly slug
- **Placeholder Images** - Generates unique placeholder images using DiceBear API
- **URL Validation** - Validates GitHub and demo URLs
- **Date Picker** - Published date selection with clear functionality

### ProjectsTable Component
- **Responsive Design** - Works on all screen sizes
- **Sorting & Filtering** - Multiple filter options
- **Bulk Operations** - Select multiple projects for batch actions
- **Status Indicators** - Visual status badges
- **Action Buttons** - Edit and delete actions

### Placeholder Image Generation
- **Dynamic Generation** - Creates unique images based on project title
- **DiceBear Integration** - Uses DiceBear API for consistent placeholder images
- **Fallback System** - Graceful handling when no image URL is provided

## State Management

The main page (`/admin/projects/page.tsx`) manages all state and passes it down to components via props. This ensures:

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

## Project-Specific Features

### Form Fields
- **Title** - Project name with validation
- **Slug** - URL-friendly identifier (auto-generated from title)
- **Meta Description** - SEO description (optional)
- **Description** - Detailed project description
- **GitHub URL** - Required repository link
- **Live Demo URL** - Optional demo link
- **Media URL** - Project image (optional, generates placeholder if empty)
- **Published Date** - Publication date picker
- **Published Status** - Toggle for published/draft
- **Featured Status** - Toggle for featured projects

### Validation Rules
- Title: Required, max 100 characters
- Slug: Required, lowercase letters, numbers, hyphens only
- Meta Description: Optional, max 160 characters
- Description: Required, 10-1000 characters
- GitHub URL: Required, valid URL format
- Live Demo URL: Optional, valid URL format
- Media URL: Optional, valid URL format

## Future Enhancements

- Add unit tests for each component
- Implement drag-and-drop for reordering projects
- Add bulk import/export functionality
- Implement project categories/tags
- Add project preview functionality
- Implement project analytics tracking
- Add keyboard shortcuts for common actions 