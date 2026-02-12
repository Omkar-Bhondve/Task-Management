# Task Management Application - Frontend

A modern React frontend for task management with beautiful UI and seamless user experience.

## 🚀 Features

- **Modern UI**: Beautiful gradient designs with glassmorphism effects
- **User Authentication**: Register, login, and secure session management
- **Task Management**: Create, read, update, delete, and toggle tasks
- **Real-time Feedback**: Toast notifications for all actions
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Statistics Dashboard**: Visual overview of tasks (total, pending, completed)
- **Smooth Animations**: Micro-animations for enhanced UX

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

## 🛠️ Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

## 🏃 Running the Application

### Development Mode:

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Build for Production:

```bash
npm run build
```

### Preview Production Build:

```bash
npm run preview
```

## 🎨 Features Overview

### Authentication

- **Register**: Create a new account with username, email, and password
- **Login**: Access your account with email and password
- **Auto-login**: Persistent sessions using localStorage
- **Secure**: JWT token-based authentication

### Dashboard

- **Task Statistics**: View total, pending, and completed tasks at a glance
- **Task List**: See all your tasks in a beautiful card layout
- **Create Task**: Add new tasks with title and description
- **Edit Task**: Update existing tasks
- **Delete Task**: Remove tasks with confirmation
- **Toggle Completion**: Mark tasks as complete/incomplete with a single click

### User Experience

- **Toast Notifications**: Success and error messages for all actions
- **Loading States**: Visual feedback during API calls
- **Empty States**: Helpful messages when no tasks exist
- **Responsive Design**: Optimized for all screen sizes
- **Smooth Animations**: Delightful micro-interactions

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── axios.js           # Axios instance with interceptors
│   │   ├── authApi.js         # Authentication API calls
│   │   └── taskApi.js         # Task API calls
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation component
│   │   ├── Navbar.css
│   │   └── PrivateRoute.jsx   # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication context
│   ├── hooks/
│   │   └── useAuth.js         # Custom auth hook
│   ├── pages/
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Registration page
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── Dashboard.css
│   │   └── Auth.css           # Auth pages styling
│   ├── App.jsx                # Main app component
│   ├── App.css                # Global styles
│   └── main.jsx               # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Design System

### Color Palette

- **Primary Gradient**: `#667eea` to `#764ba2`
- **Background**: `#f5f7fa` to `#c3cfe2`
- **Success**: `#48bb78`
- **Warning**: `#f6ad55`
- **Error**: `#f56565`

### Typography

- **Font Family**: Inter, system fonts
- **Headings**: 700 weight
- **Body**: 400-600 weight

### Components

- **Cards**: Rounded corners (12-16px), subtle shadows
- **Buttons**: Gradient backgrounds, hover animations
- **Inputs**: Clean borders, focus states with glow
- **Modals**: Backdrop blur, slide-up animation

## 🔧 Configuration

### API Proxy

The Vite config includes a proxy to the backend:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

### Environment Variables (Optional)

Create a `.env` file if you need custom configuration:

```env
VITE_API_URL=http://localhost:5000
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Components

### AuthContext

Manages global authentication state:

- User information
- Token management
- Login/Register/Logout functions
- Authentication status

### PrivateRoute

Protects routes that require authentication:

- Redirects to login if not authenticated
- Allows access if authenticated

### Dashboard

Main application interface:

- Task statistics cards
- Task grid/list
- Create/Edit modal
- Task actions (complete, edit, delete)

## 🔒 Security

- JWT tokens stored in localStorage
- Automatic token attachment to requests
- 401 error handling with auto-logout
- Protected routes with PrivateRoute component

## 🎨 Styling Approach

- **CSS Modules**: Component-scoped styles
- **Modern CSS**: Flexbox, Grid, Custom Properties
- **Animations**: CSS transitions and keyframes
- **Responsive**: Mobile-first approach

## 🚀 Performance

- **Vite**: Lightning-fast HMR and builds
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Proper sizing and formats

## 🧪 Testing

The application can be tested by:

1. Starting the backend server
2. Running the frontend dev server
3. Registering a new user
4. Creating, editing, and managing tasks

## 📝 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

## 🐛 Troubleshooting

### Backend Connection Issues

- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.js`

### Authentication Issues

- Clear localStorage and try again
- Check if JWT token is valid
- Verify backend is responding

### Styling Issues

- Clear browser cache
- Check for CSS conflicts
- Verify all CSS files are imported

## 🎯 Future Enhancements

- Task categories/tags
- Task priority levels
- Due dates and reminders
- Task search and filtering
- Dark mode toggle
- Task sharing
- Export tasks

## 📄 License

ISC
