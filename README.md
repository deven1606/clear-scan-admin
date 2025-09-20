# React Admin Panel with Material-UI

A modern, responsive admin panel built with React.js and Material-UI (MUI). This admin panel includes a comprehensive dashboard, user management, product management, and settings pages.

## Features

- **Attractive Login Page**: Modern gradient design with glassmorphism effects
- **Dashboard**: Overview with statistics cards, charts, and recent activity
- **User Management**: Complete CRUD operations with separate form pages
- **Product Management**: Product catalog with inventory tracking and separate forms
- **Settings**: Comprehensive settings panel with various configurations
- **Authentication**: Protected routes with login/logout functionality
- **Responsive Design**: Mobile-friendly layout with collapsible sidebar
- **Modern UI**: Clean, professional interface using Material-UI components
- **JSX Format**: All components use JSX syntax for better React development

## Technologies Used

- React 18
- Material-UI (MUI) v5
- React Router v6
- MUI X Data Grid
- Emotion (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── AdminLayout.jsx      # Main layout with sidebar and header
│   └── ProtectedRoute.jsx   # Authentication wrapper component
├── contexts/
│   └── AuthContext.jsx      # Authentication context provider
├── pages/
│   ├── Dashboard.jsx        # Dashboard with statistics and charts
│   ├── Login.jsx           # Attractive login page
│   ├── Users.jsx          # User management page
│   ├── AddUser.jsx        # Add user form page
│   ├── EditUser.jsx       # Edit user form page
│   ├── Products.jsx       # Product management page
│   ├── AddProduct.jsx     # Add product form page
│   ├── EditProduct.jsx    # Edit product form page
│   └── Settings.jsx       # Settings configuration page
├── App.jsx                # Main app component with routing
└── index.jsx              # Entry point
```

## Pages Overview

### Dashboard
- Statistics cards showing key metrics
- Recent activity feed
- Placeholder for charts and graphs
- Quick overview of system status

### Login
- Modern gradient background with glassmorphism effects
- Demo credentials provided
- Responsive design for all devices
- Smooth animations and transitions

### Users
- Data grid with user information
- Separate Add User form page with validation
- Separate Edit User form page with profile management
- Search and filter capabilities
- User statistics cards

### Products
- Product catalog management
- Separate Add Product form with detailed fields
- Separate Edit Product form with image management
- Inventory tracking and category organization
- Stock status indicators and pricing management

### Settings
- General site settings
- Security configurations
- Notification preferences
- Theme customization
- Profile management

## Customization

The admin panel is designed to be easily customizable:

1. **Theme**: Modify the theme in `src/index.js`
2. **Navigation**: Update menu items in `src/components/AdminLayout.js`
3. **Pages**: Add new pages in the `src/pages/` directory
4. **Routing**: Update routes in `src/App.js`

## Features to Extend

- Authentication and authorization
- Real-time data updates
- Advanced charts and analytics
- File upload functionality
- Email integration
- API integration
- Database connectivity

## License

This project is open source and available under the [MIT License](LICENSE).
