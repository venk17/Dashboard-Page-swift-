# SWIFT Dashboard Application

A modern, responsive dashboard application built with React and Tailwind CSS for managing user profiles and comments data.

## Features

### 📊 Dashboard
- **Comments Management**: Display all 500 comments from the API in a paginated data grid
- **Custom Pagination**: Choose from 10, 50, or 100 items per page
- **Advanced Search**: Partial search functionality across name, email, and comment fields
- **Smart Sorting**: Custom sorting for Post ID, Name, and Email columns with cycling behavior (none → ascending → descending → none)
- **Data Persistence**: All filters, sorting, and pagination state persist across page refreshes using localStorage

### 👤 Profile Screen
- **User Information**: Display complete user profile from the first API record
- **Non-editable Interface**: Clean, read-only profile view
- **Responsive Design**: Optimized for all device sizes

### 🚀 Technical Features
- **React Router**: Seamless navigation between dashboard and profile screens
- **Custom Components**: Self-implemented pagination, sorting, and search components
- **Cross-browser Compatibility**: Works across Edge, Firefox, and Chrome
- **Mobile Responsive**: Fully responsive design with custom breakpoints
- **localStorage Integration**: Persistent state management for user preferences

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- **Users API**: `https://jsonplaceholder.typicode.com/users`
- **Comments API**: `https://jsonplaceholder.typicode.com/comments`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Common header component
│   ├── LoadingSpinner.jsx  # Loading state component
│   ├── Pagination.jsx      # Custom pagination component
│   └── SortButton.jsx      # Sorting control component
├── pages/
│   ├── Dashboard.jsx       # Main dashboard with comments table
│   └── Profile.jsx         # User profile screen
├── App.tsx                 # Main application component with routing
├── main.tsx               # Application entry point
└── index.css              # Global styles with Tailwind CSS
```

## Key Implementation Details

### Custom Pagination
- Implemented without external libraries
- Supports 10, 50, and 100 items per page
- Maintains current page state when changing page sizes
- Smart page navigation with ellipsis for large page counts

### Sorting Logic
- Cycling behavior: No sort → Ascending → Descending → No sort
- Only one column can be sorted at a time
- Visual indicators for current sort state
- Maintains sort state across page refreshes

### Search Functionality
- Real-time partial search across multiple fields
- Searches through name, email, and comment content
- Resets pagination to first page when searching
- Case-insensitive search implementation

### State Persistence
- All user preferences saved to localStorage
- Includes search term, current page, page size, and sort configuration
- Automatically restores state on page refresh
- Handles edge cases for invalid saved states

## Browser Compatibility

Tested and optimized for:
- ✅ Google Chrome
- ✅ Mozilla Firefox
- ✅ Microsoft Edge

## Responsive Design

- **Mobile (< 768px)**: Optimized layout with stacked elements
- **Tablet (768px - 1024px)**: Balanced layout with responsive grid
- **Desktop (> 1024px)**: Full-width layout with optimal spacing

## Technologies Used

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Vite**: Fast build tool and development server

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- ESLint configuration for consistent code style
- TypeScript support for better development experience
- Responsive design principles
- Accessibility considerations

## Assignment Requirements Met

✅ **Timeline**: Completed within 48 hours  
✅ **React Implementation**: Built with React and modern hooks  
✅ **JavaScript**: Written in plain JavaScript (no TypeScript)  
✅ **API Integration**: Both users and comments APIs implemented  
✅ **Custom Pagination**: No external libraries used  
✅ **Search Functionality**: Partial search across required fields  
✅ **Custom Sorting**: Cycling sort behavior for specified columns  
✅ **State Persistence**: localStorage implementation  
✅ **Responsive Design**: Mobile-optimized layouts  
✅ **Routing**: Proper navigation between pages  
✅ **Cross-browser**: Tested across specified browsers  
✅ **Self-implemented Components**: Custom pagination, sorting, and search  

## Performance Optimizations

- Efficient filtering and sorting algorithms
- Minimal re-renders with proper state management
- Optimized image loading and responsive images
- Proper error handling and loading states

## Future Enhancements

- Advanced filtering options
- Export functionality for data
- User authentication
- Real-time data updates
- Advanced analytics dashboard